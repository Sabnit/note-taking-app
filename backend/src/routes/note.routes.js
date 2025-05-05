import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getAllNotes,
  updateNote,
} from "../controller/note.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createNoteSchema,
  deleteNoteSchema,
  getNoteSchema,
  updateNoteSchema,
} from "../schema/note.schema.js";

const router = Router();

router.get("/", getAllNotes);
router.get("/:id", validate(getNoteSchema), getNoteById);
router.post("/", validate(createNoteSchema), createNote);
router.patch("/:id", validate(updateNoteSchema), updateNote);
router.delete("/:id", validate(deleteNoteSchema), deleteNote);

export default router;
