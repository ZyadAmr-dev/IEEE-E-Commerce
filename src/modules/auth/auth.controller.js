<<<<<<< Updated upstream
import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { User } from "../../../DB/models/user.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

>>>>>>> Stashed changes

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

  // generate token
  const token = jwt.sign(
    {
      email,
    },
    process.env.TOKEN_SECRET
  );

  // create user
  await User.create({
    userName,
    email,
    password: hashPassword,
  });

  // missed : send email / confirm link
  return res.status(201).json({ success: true, message: "check email!" });
});


//login 
export const login = asyncHandler(async (req,res,next)=>{
  //data from request
  const {email , password} = req.body
  //check user existance
  const user = await User.findOne({email})
  if(!user) return next(new Error("invalid email" ,{cause : 404}))
  //check isConfirmed
  //if(!user.isConfirmed) return next(new Error("you should activate your account"))
  //check password
  const match = bcryptjs.compareSync(password , user.password )
  if(!match) return next(new Error("invalid password"))
  //generate token 
  const token = jwt.sign({email , id:user._id} , process.env.TOKEN_SECRET)
  //save token in token model
  await Token.create({token , user :user._id})
  //send response
  return res.json({success : true , results :{token}})
})
