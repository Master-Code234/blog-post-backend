import express from "express";

const router = express.Router();

import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
} from "../controllers/blogPostController.js";

// Routes
router.get("/", getAllBlogPosts);
router.get("/:id", getBlogPostById);
router.post("/", createBlogPost);
router.put("/:id", updateBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;
