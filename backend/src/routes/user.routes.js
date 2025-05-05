import { Router } from "express";
import {
  deleteUser,
  getCurrentUser,
  getUserById,
  updateUser,
} from "../controller/user.controller.js";

const router = Router();
router.get("/me", getCurrentUser);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
