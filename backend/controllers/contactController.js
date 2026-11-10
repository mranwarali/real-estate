const Contact = require("../models/ContactModel");

const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details",
      });
    }

    const filledForm = await Contact.create({
      fullName,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "We've received your message! We'll get back to you soon.",
      data: filledForm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { createContact };
