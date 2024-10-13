import { Router } from "express";
const router = Router();
import * as authController from "./auth.controller.js";
import * as authSchema from "./auth.schema.js";
import { validation } from "../../middlewares/validation.middleware.js";

// register
router.post(
  "/register",
  validation(authSchema.register),
  authController.register
);

export default router;
