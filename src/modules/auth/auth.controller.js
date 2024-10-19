import { User } from "../../../DB/models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Token } from "../../../DB/models/token.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res, next) => {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password) {
        return next(new Error("All fields are required", { cause: 400 }));
    }

    const validRoles = ["user", "admin"];
    if (role && !validRoles.includes(role)) {
        return next(new Error("Invalid role provided", { cause: 400 }));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new Error("User already exists!", { cause: 409 }));
    }

    const hashPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT, 10));

    const newUser = await User.create({
        userName,
        email,
        password: hashPassword,
        role: role || "user",
    });

    const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    await Token.create({
        token, 
        user: newUser._id,
        expiredAt: new Date(Date.now() + 60*60), 
    });

    return res.status(201).json({
        success: true,
        message: "User registered successfully. Check your email for confirmation.",
        token,
    });
});


//login 
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new Error("Invalid email", { cause: 404 }));

  const match = bcryptjs.compareSync(password, user.password);
  if (!match) return next(new Error("Invalid password"));

  const token = jwt.sign({ email, id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

  await Token.create({ token, user: user._id });

  return res.json({ success: true, results: { token } });
});

// signout

export const signOut = asyncHandler(async (req, res, next) => {
  const token = req.headers['authorization'];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    if(!decoded) return res.status(401).json({ messgae: 'invalid token' })

    const tokenRecord = await Token.findOne({ token: token, isValid: true });

    if (!tokenRecord) {
      return res.status(404).json({ message: 'Token not found or already signed out' });
    }

    tokenRecord.isValid = false;
    await tokenRecord.save();

    return res.status(200).json({ message: 'Sign out successful, token invalidated' });

  } catch (err) {
    console.error('Token verification error:', err); 
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
});

