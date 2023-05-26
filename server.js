// All imports
const express = require("express");
const blogPostController = require("./controllers/blogPostController");
const mongoose = require("mongoose");
require("dotenv").config();



const app = express();

const MONGO_URI = process.env.MONGO_URI;

const PORT = process.env.PORT || 3001;

// Connecting to mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected To MongoDB");
});

// mongodb error handleing
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// MiddleWare

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Getting Routes from controllers file

app.use("/blogPost", blogPostController);

app.listen(PORT, () => {
  console.log(`Listening on port, ${PORT}`);
});
