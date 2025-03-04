import mongoose from "mongoose";

export const connectToDb = async () => {
  if (!process.env.MONGO_URI) {
    console.error("Environment variable is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database Connection Error: An issue occurred.");
    process.exit(1);
  }
};
