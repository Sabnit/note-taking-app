import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constant/pagination.js";
import * as noteServices from "../services/note.service.js";

export const createNote = async (req, res, next) => {
  try {
    const {
      body: data,
      user: { userId },
    } = req;

    const note = await noteServices.createNote(data, userId);

    res.status(201).json({
      status: "success",
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const noteId = parseInt(id);

    const note = await noteServices.getNoteById(noteId, userId);

    res.status(200).json({
      status: "success",
      message: "Note retrieved successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const {
      page = DEFAULT_PAGE,
      limit = DEFAULT_PAGE_SIZE,
      sortBy,
      order,
    } = req.query;

    const paginationOptions = {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      order,
    };

    const notes = await noteServices.getAllNotes(userId, paginationOptions);

    res.status(200).json({
      status: "success",
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { userId } = req.user;

    const noteId = parseInt(id);

    const updatedNote = await noteServices.updateNote(noteId, userId, body);

    res.status(200).json({
      status: "success",
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const noteId = parseInt(id);

    const note = await noteServices.deleteNote(noteId, userId);

    res.status(200).json({
      status: "success",
      message: `Note has been removed successfully`,
      note,
    });
  } catch (error) {
    next(error);
  }
};
