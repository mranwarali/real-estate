const Enquiry = require("../models/EnquiryModel");

const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, phone, propertyType, location, message } =
      req.body;

    if (!fullName || !email || !phone || !propertyType || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details",
      });
    }

    const existingEnquiry = await Enquiry.findOne({
      email,
      location,
      propertyType,
    });

    if (existingEnquiry) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted an enquiry for this location.",
      });
    }

    const newEnquiry = await Enquiry.create({
      fullName,
      email,
      phone,
      propertyType,
      location,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      data: newEnquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { createEnquiry };
