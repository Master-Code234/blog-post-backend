import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/database.js";
import { rateLimit } from "express-rate-limit";
import blogPostRoutes from "./routes/blogPosts.js";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use("/blogPost", blogPostRoutes);

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server ${error.message}`);
    process.exit(1);
  }
};

startServer();
