import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";

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

  // missed : send email / confirm link
  return res.status(201).json({ success: true, message: "check email!" });
});
