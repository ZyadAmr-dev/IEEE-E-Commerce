import joi from "joi";

export const reviewSchema = joi.object({
  addReview: joi.object({
    productID: joi.string().required(),
    rating: joi.number().min(1).max(5).required(),
    comment: joi.string().required(),
  }),
  updateReview: joi.object({
    rating: joi.number().min(1).max(5).required(),
    comment: joi.string().required(),
  }),
});
