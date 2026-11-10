const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },

    propertyType: {
      type: String,
      required: true,
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
    },
    location: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Enquiry", enquirySchema);
