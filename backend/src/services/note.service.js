import { categoryModel } from "../models/Category.model.js";
import { noteModel } from "../models/Note.model.js";
import AppError from "../utils/AppError.js";
import { parseDate, prepareCategoryIds } from "../utils/noteUtils.js";

/**
 * Create a note
 * @param {Object} data - Data for creating a note
 * @param {string} data.title - Title of the note
 * @param {Array} data.categoryIds - Array of category IDs
 * @param {string} data.description - Description of the note
 * @param {string} data.date - Date of the note
 * @param {string} data.userId - User ID of the note owner
 * @returns {Promise<Object>} - Created note object
 * @throws {AppError} - Throws an error if the note title is empty, or if a category does not exist, or if a note with the same title already exists
 */
export const createNote = async (data, userId) => {
  const { title, categoryIds, description, date } = data;
  const isoDate = parseDate(date);
  const descriptionNormalized = description ? description.trim() : null;
  const titleNormalized = title.trim();
  const categories = prepareCategoryIds(categoryIds);

  if (!titleNormalized) {
    throw new AppError("Title is empty", 400);
  }

  for (const { id } of categories) {
    const category = await categoryModel.findById(id, userId);
    if (!category) {
      throw new AppError(`Category with id:${id} does not exist`, 404);
    }
  }

  const existingNote = await noteModel.findByTitle(titleNormalized, userId);

  if (existingNote) {
    throw new AppError("Note with this title already exists", 409);
  }

  return await noteModel.create({
    title,
    categoryIds: categories,
    description: descriptionNormalized,
    date: isoDate,
    userId,
  });
};

export const getNoteById = async (noteId, userId) => {
  const note = await noteModel.findById(noteId, userId);

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return note;
};

export const getAllNotes = async (userId, paginationOptions) => {
  const { page, limit, sortBy, order } = paginationOptions;

  return (
    (await noteModel.findAll(userId, { page, limit, sortBy, order })) || []
  );
};

export const updateNote = async (noteId, userId, data) => {
  const { title, categoryIds, description, date } = data;
  const updateData = {};

  const note = await noteModel.findById(noteId, userId);
  if (!note) {
    throw new AppError("Note not found", 404);
  }

  if (title) {
    const titleNormalized = title.toLowerCase().trim();
    const existingNote = await noteModel.findByTitle(titleNormalized, userId);

    if (existingNote) {
      throw new AppError("Note with this title already exists", 409);
    }

    updateData.title = titleNormalized;
  }

  if (description) {
    updateData.description = description.trim();
  }

  if (date) {
    updateData.date = new Date(`${date}T00:00:00.00Z`);
  }

  if (categoryIds) {
    updateData.categoryIds = prepareCategoryIds(categoryIds);
  }

  if (Object.keys(updateData).length === 0) {
    return note;
  }

  return await noteModel.update(noteId, updateData);
};

export const deleteNote = async (noteId, userId) => {
  const note = await noteModel.findById(noteId, userId);

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return await noteModel.delete(noteId);
};
