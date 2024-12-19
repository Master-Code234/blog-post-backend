const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");

router.get("/", (req, res) => {
  BlogPost.find({}, (err, foundBlogPost) => {
    res.json(foundBlogPost);
  });
});

// Delete
router.delete("/:id", (req, res) => {
  BlogPost.findByIdAndRemove(req.params.id, (err, deletedBlogPost) => {
    res.json(deletedBlogPost);
  });
});

// Update
router.put("/:id", (req, res) => {
  BlogPost.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBlogPost) => {
      res.json(updatedBlogPost);
    }
  );
});

// Create
router.post("/", (req, res) => {
  BlogPost.create(req.body, (err, createdBlogPost) => {
    res.json(createdBlogPost);
  });
});

// Show
router.get("/:id", (req, res) => {
  BlogPost.findById(req.params.id, (err, foundBlogPost) => {
    res.json(foundBlogPost);
  });
});

module.exports = router;
