const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
} = require("../controllers/blogController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/get-posts", getPosts);
router.get("/get-post/:id", getPost);

module.exports = router;
