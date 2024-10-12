import { Schema, Types } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        name: {
          type: String,
        },
        itemPrice: {
          type: Number,
        },
        totalPrice: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    address: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    phone: {
      type: String,
      required: true,
    },
    invoice: {
      url: String,
      id: String,
    },
    coupon: {
      id: {
        type: Types.ObjectId,
        ref: "Coupon",
      },
      discount: {
        type: Number,
      },
      name: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
