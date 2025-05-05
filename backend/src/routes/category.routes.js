import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getNotesByCategory,
  updateCategory,
} from "../controller/category.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", validate(getCategorySchema), getCategoryById);
router.get("/:id/notes", validate(getCategorySchema), getNotesByCategory);
router.post("/", validate(createCategorySchema), createCategory);
router.put("/:id", validate(updateCategorySchema), updateCategory);
router.delete("/:id", validate(deleteCategorySchema), deleteCategory);

export default router;
