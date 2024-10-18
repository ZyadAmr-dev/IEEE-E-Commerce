import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import { reviewSchema } from "./review.schema.js";
import * as reviewController from "./review.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// to do const Router({ mergeParams: true });

const router = Router();
// add review
// to do auth middleware
router.post(
  "/",
  validation(reviewSchema.addReview),
  asyncHandler(reviewController.addReview)
);

// As a user i want to view all reviews on certain product
router.get("/:productID", asyncHandler(reviewController.getReviews));

export default router;
