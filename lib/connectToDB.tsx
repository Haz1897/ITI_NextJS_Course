import mongoose from "mongoose";

export async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  await mongoose.connect(process.env.MONGODB_URI);
}
