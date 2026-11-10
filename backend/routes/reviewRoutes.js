const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  postPropertyReview,
  fetchPropertyReviews,
} = require("../controllers/reviewController");

router.post("/post-review/:id", verifyToken, postPropertyReview);
router.get("/fetch-reviews/:id", fetchPropertyReviews);

module.exports = router;
