import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  qty: { type: Number, required: true }
});

export default mongoose.model("CartItem", CartItemSchema);
