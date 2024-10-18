import Joi from "joi";

export const cartSchema = Joi.object({
  addToCart: Joi.object({
    productID: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
  }),
});
