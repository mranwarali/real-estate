const Property = require("../models/PropertyModel");

// fetch properties
const getProperties = async (req, res) => {
  try {
    let queryStr = JSON.stringify(req.query);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    let query = JSON.parse(queryStr);

    if (req.query.city) {
      query["address.city"] = { $regex: req.query.city, $options: "i" };
      delete query.city; //prevents the search conflict
    }
    // if (req.query.type) {
    //   query.propertyType = req.query.type;
    // }

    if (req.query.listingType) {
      query.listingType = req.query.listingType;
    }

    // if (req.query.bedrooms) {
    //   query["features.bedroom"] = { $gte: req.query.bedrooms };
    // }

    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 10;
    // const skip = (page - 1) * limit;

    const properties = await Property.find(query)
      .populate("owner", "name email phone avatar")
      // .skip(skip)
      // .limit(limit)
      .sort("-createdAt");

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      // pagination: {
      //   total,
      //   page,
      //   pages: Math.ceil(total / limit),
      // },
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// fetch property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner agent",
    );

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    res.status(200).json({ success: true, data: property });
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid ID format" });
  }
};

// const createProperty = async (req, res) => {
//   try {
//     req.body.owner = req.user.id;
//     const property = await Property.create(req.body);

//     res.status(201).json({ success: true, data: property });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// const createProperty = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ success: false, error: "Not authorized" });
//     }

//     req.body.owner = req.user.id;

//     if (req.files && req.files.length > 0) {
//       req.body.images = req.files.map((file) => file.path);
//     }

//     const property = await Property.create(req.body);

//     res.status(201).json({ success: true, data: property });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// create property
const createProperty = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: "Not authorized" });
    }

    const propertyData = { ...req.body };

    const nestedFields = [
      "price",
      "address",
      "features",
      "amenities",
      "contact",
    ];

    nestedFields.forEach((field) => {
      if (propertyData[field] && typeof propertyData[field] === "string") {
        try {
          propertyData[field] = JSON.parse(propertyData[field]);
        } catch (parseErr) {
          console.error(`Failed to parse ${field}:`, parseErr);
        }
      }
    });

    propertyData.owner = req.user.id;

    if (req.files && req.files.length > 0) {
      propertyData.images = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename || file.public_id || "",
      }));
    }

    const property = await Property.create(propertyData);

    res.status(201).json({ success: true, data: property });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// update property
const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    if (
      property.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ success: false, error: "You are not authorized to edit this" });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: property });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    if (
      property.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        error: "You are not authorized to delete this",
      });
    }

    await property.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Property removed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};
