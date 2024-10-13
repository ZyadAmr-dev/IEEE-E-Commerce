import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the product model
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
