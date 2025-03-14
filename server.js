import express from "express";
import dotenv from "dotenv";
import rateLimitMiddleware from "./middleware/rateLimitMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { connectToDb } from "./config/database.js";
import blogPostRoutes from "./routes/blogPosts.js";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(rateLimitMiddleware);
app.use("/blogPost", blogPostRoutes);
app.use(errorHandlerMiddleware);

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
