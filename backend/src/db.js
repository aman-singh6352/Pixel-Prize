import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGO_URL;

export const connectDB = () => {
  try {
    mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
