import { Product } from "../../../DB/models/product.model.js";

// add to cart
export const addToCart = async (req, res, next) => {
  const { productID, quantity } = req.body;

  // check if product exists
  const product = await Product.findById(productID);
  if (!product) {
    return next(new Error("Product not found", { cause: 404 }));
  }

  // check if product is in stock
  if (product.availableItems < quantity) {
    return next(new Error("Product out of stock", { cause: 409 }));
  }

  // check if product already in cart
  const cartItem = req.user.cart.find(
    (item) => item.productID.toString() === productID
  );

  if (cartItem) {
    return next(new Error("Product already in cart", { cause: 409 }));
  }

  // add to cart
  req.user.cart.push({ productID, quantity });
  await req.user.save();

  return res.status(201).json({ success: true, data: req.user.cart });
};
