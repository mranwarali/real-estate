const Reviews = require("../models/ReviewModal");

const postPropertyReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  try {
    const alreadyReviewed = await Reviews.findOne({
      property: id,
      user: req.user?._id || req.user?.id,
    });

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this property" });
    }

    const newReview = new Reviews({
      rating: Number(rating),
      comment,
      user: req.user?._id || req.user?.id,
      property: id,
    });

    await newReview.save();

    res.status(201).json({ message: "You have reviewed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchPropertyReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Reviews.find({ property: id })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const formattedReviews = reviews.map((r) => ({
      _id: r._id,
      rating: r.rating,
      comment: r.comment,
      userName: r.user ? r.user.name : "Anonymous User",
      createdAt: r.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: formattedReviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { postPropertyReview, fetchPropertyReviews };
