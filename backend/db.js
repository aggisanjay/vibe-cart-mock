import mongoose from "mongoose";
import Product from "./models/Product.js";
import { productsSeed } from "./seed/product.js";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI missing");

  await mongoose.connect(uri);

  console.log("✅ MongoDB connected");

  // Seed only if empty
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log("🌱 Seeding products...");
    await Product.insertMany(productsSeed);
    console.log("✅ Products seeded");
  }
}
