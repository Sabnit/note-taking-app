import { Router } from "express";

import { auth } from "../middlewares/auth.js";
import authRoutes from "./auth.routes.js";
import noteRoutes from "./note.routes.js";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", auth, userRoutes);
router.use("/note", auth, noteRoutes);
router.use("/category", auth, categoryRoutes);

export default router;
