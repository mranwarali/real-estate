const Newsletter = require("../models/NewsletterModel");

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required." });
    }
    const alreadySubscribe = await Newsletter.findOne({ email });

    if (alreadySubscribe) {
      return res
        .status(400)
        .json({ message: "You have already subscribed the newsletter!" });
    }

    await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: "You have successfully subscribed the newsletter",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong on our end. Try again?",
    });
  }
};

module.exports = { subscribe };
