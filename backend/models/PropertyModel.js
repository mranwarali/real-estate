const mongoose = require("mongoose");

// sub-schema: image
const imagesSchema = new mongoose.Schema({
  url: {
    type: String,
    // required: true,
  },
  publicId: {
    type: String,
    // required: true,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  caption: String,
});

// sub-schema: price
const priceSchema = new mongoose.Schema({
  amount: {
    type: Number,
    // required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: "USD",
  },
  rentPeriod: {
    type: String,
    default: "monthly",
  },
  isNegotiable: {
    type: Boolean,
    default: false,
  },
  securityDeposit: Number,
  maintenanceFee: Number,
});

// sub-schema: address
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  zipcode: {
    type: String,
    // required: true,
  },
});

// sub-schema: features
const featuresSchema = new mongoose.Schema({
  bedroom: {
    type: Number,
    min: 0,
    default: 0,
  },
  bathroom: {
    type: Number,
    min: 0,
    default: 0,
  },
  parkingSpace: {
    type: Number,
    min: 0,
    default: 0,
  },
  floorNumber: Number,
  totalFloors: Number,
  areaSqFt: {
    type: Number,
    min: 0,
  },
  lotSizeSqFt: Number,
  builtYear: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear() + 2,
  },
});

// sub-schema: amenities
const amenitiesSchema = new mongoose.Schema({
  // Interior & Comfort
  airConditioning: { type: Boolean, default: false },
  heating: { type: Boolean, default: false },
  wifi: { type: Boolean, default: false },
  washer: { type: Boolean, default: false },
  dryer: { type: Boolean, default: false },
  furnished: { type: Boolean, default: false },

  // Kitchen
  dishwasher: { type: Boolean, default: false },
  microwave: { type: Boolean, default: false },
  refrigerator: { type: Boolean, default: false },

  // Building & Outdoor
  parking: { type: Boolean, default: false },
  gym: { type: Boolean, default: false },
  pool: { type: Boolean, default: false },
  elevator: { type: Boolean, default: false },
  garden: { type: Boolean, default: false },
  balcony: { type: Boolean, default: false },
  petFriendly: { type: Boolean, default: false },

  // Security
  cctv: { type: Boolean, default: false },
  securityGuard: { type: Boolean, default: false },
  intercom: { type: Boolean, default: false },
});

// ----------------main schema: property-------------------------
const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    listingType: {
      type: String,
      enum: ["sales", "rent"],
      required: true,
    },
    propertyType: {
      type: String,
      enum: [
        "house",
        "apartment",
        "condo",
        "villa",
        "studio",
        "land",
        "commercial",
        "office",
        "warehouse",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "sold", "rented"],
      default: "active",
    },
    address: {
      type: addressSchema,
      // required: true,
    },
    features: {
      type: featuresSchema,
      // required: true,
    },
    amenities: {
      type: amenitiesSchema,
      // required: true,
    },
    price: {
      type: priceSchema,
      // required: true,
    },
    images: {
      type: [imagesSchema],
      validate: (arr) => arr.length <= 20,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// indexes
propertySchema.index({ status: 1, propertyType: 1, listingType: 1 });

module.exports = mongoose.model("Property", propertySchema);
