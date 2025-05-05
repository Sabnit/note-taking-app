import { Router } from "express";

import {
  login,
  signup,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
} from "../controller/auth.controller.js";
import { auth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, signupSchema } from "../schema/auth.schema.js";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", auth, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh", refreshToken);

export default router;
