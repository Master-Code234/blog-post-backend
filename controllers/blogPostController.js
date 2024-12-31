import express from "express";
import BlogPost from "../models/blogPost.js";

const router = express.Router();

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const foundBlogPosts = await BlogPost.find({});
    res.json(foundBlogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// Delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(deletedBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});

// Update a blog post
router.put("/:id", async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(updatedBlogPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    const createdBlogPost = await BlogPost.create(req.body);
    res.status(201).json(createdBlogPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Get a single blog post
router.get("/:id", async (req, res) => {
  try {
    const foundBlogPost = await BlogPost.findById(req.params.id);
    if (!foundBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(foundBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

export default router;
