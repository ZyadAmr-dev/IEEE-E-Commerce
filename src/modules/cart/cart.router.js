import router from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import { cartSchema } from "./cart.schema.js";
import * as cartController from "./cart.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const cartRouter = router();

// add to cart
cartRouter.post(
  "/",
  validation(cartSchema.addToCart),
  asyncHandler(cartController.addToCart)
);

export default cartRouter;
