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
<<<<<<< Updated upstream
=======

//login
router.post("/login" , validation(authSchema.login) , authController.login)


export default router;
>>>>>>> Stashed changes
