import { Router } from "express";
const router = Router();
import * as authController from "./auth.controller.js";
import * as authSchema from "./auth.schema.js";
import { validation } from "../../middlewares/validation.middleware.js";

// Register
router.post(
  "/register",
  validation(authSchema.register),
  authController.register
);

// Login
router.post(
  "/login",
  validation(authSchema.login),
  authController.login
);

// Sign out
router.post('/signout', authController.signOut);

export default router;
