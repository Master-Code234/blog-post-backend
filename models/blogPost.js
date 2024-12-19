const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

const Post = mongoose.model("Post", blogPostSchema);

module.exports = Post;
