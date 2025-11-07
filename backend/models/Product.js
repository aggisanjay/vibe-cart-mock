import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true }, // manual ID (p1, p2...)
  name: String,
  price: Number,
  image: String
});

export default mongoose.model("Product", ProductSchema);
