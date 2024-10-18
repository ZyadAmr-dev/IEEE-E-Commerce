import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Token } from "../../../DB/models/token.model.js";
import { Cart } from "../../../DB/models/cart.model.js";

export const register = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  // check if user already exists
  const user = await User.findOne({
    email,
  });
  if (user) {
    return next(new Error("User already exists!", { cause: 409 }));
  }
  // hash password
  const hashPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT));

  // create user
  await User.create({
    userName,
    email,
    password: hashPassword,
  });

  // create a cart
  await Cart.create({ user: user._id });

  // to do : send email / confirm link
  return res.status(201).json({ success: true, message: "check email!" });
});

//login
export const login = asyncHandler(async (req, res, next) => {
  //data from request
  const { email, password } = req.body;
  //check user existance
  const user = await User.findOne({ email });
  if (!user) return next(new Error("invalid email", { cause: 404 }));
  //check isConfirmed
  //if(!user.isConfirmed) return next(new Error("you should activate your account"))
  //check password
  const match = bcryptjs.compareSync(password, user.password);
  if (!match) return next(new Error("invalid password"));
  //generate token
  const token = jwt.sign({ email, id: user._id }, process.env.TOKEN_SECRET);
  //save token in token model
  await Token.create({ token, user: user._id });
  //send response
  return res.json({ success: true, results: { token } });
});
