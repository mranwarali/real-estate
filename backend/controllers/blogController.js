const Posts = require("../models/BlogModel");
const slugify = require("slugify");

// upload post
const createPost = async (req, res) => {
  try {
    const { title, content, coverImage, tags, status } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const newPost = new Posts({
      title,
      slug,
      content,
      coverImage,
      tags,
      status,
      author: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post Created Successfully",
      savedPost,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Something is wrong while creating post",
    });
  }
};

// fetch posts
const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Unable to fetch posts",
    });
  }
};

// fetch post

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error occurred while fetching the post",
    });
  }
};

module.exports = { createPost, getPosts, getPost };
