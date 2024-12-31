import BlogPost from "../models/blogPost.js";
import mongoose from "mongoose";

// Get all blog posts
export const getAllBlogPosts = async (req, res) => {
  try {
    const foundBlogPosts = await BlogPost.find({});
    res.status(200).json({ success: true, data: foundBlogPosts });
  } catch (error) {
    console.log("Error fetching blog post:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a single blog post
export const getBlogPostById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid blog post ID" });
  }
  try {
    const foundBlogPost = await BlogPost.findById(id);

    if (!foundBlogPost) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    res.status(200).json({ success: true, data: foundBlogPost });
  } catch (error) {
    console.error("Failed to get blog post", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new blog post
export const createBlogPost = async (req, res) => {
  const post = req.body;

  if (!post) {
    return res
      .status(400)
      .json({ success: false, message: "Blog post cannot be empty" });
  }

  const newBlogPost = new BlogPost(post);

  try {
    await newBlogPost.save();
    res.status(201).json({ success: true, data: newBlogPost });
  } catch (error) {
    console.error("Error creating blog post:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update a blog post
export const updateBlogPost = async (req, res) => {
  const { id } = req.params;

  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid blog post ID" });
  }

  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedBlogPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    await BlogPost.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog post deleted" });
  } catch (error) {
    console.log("Error deleting blog post:", error.message);
    res.status(404).json({ success: false, message: "Blog post not found" });
  }
};
