import { Product } from "../../../DB/models/product.model.js";
import { Review } from "../../../DB/models/review.model.js";
import Order from "../order/order.model";

export const addReview = async (req, res, next) => {
  const { productID } = req.params;
  const { rating, comment } = req.body;

  // check product in order
  const order = await Order.findOne({
    user: req.user._id,
    status: "completed",
    "products.productID": productID,
  });

  if (!order) {
    return next(new Error("Product not found in order", { cause: 404 }));
  }

  // check if already reviewed
  const isReviewed = Review.findOne({
    productID,
    createdBy: req.user._id,
    orderId: order._id,
  });

  if (isReviewed) {
    return next(new Error("Product already reviewed", { cause: 409 }));
  }

  // add review
  const review = await Review.create({
    productID,
    createdBy: req.user._id,
    rating,
    comment,
    orderId: order._id,
  });

  // calculate average rating
  const reviews = await Review.find({ productID });
  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.rating;
  });
  const averageRating = totalRating / reviews.length;

  // update product average rating
  await Product.findByIdAndUpdate(productID, { averageRating });

  return res.status(201).json({ success: true, data: review });
};
