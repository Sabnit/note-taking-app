import { categoryModel } from "../models/Category.model.js";
import AppError from "../utils/AppError.js";

export const createCategory = async ({ title, userId }) => {
  const existingCategory = await categoryModel.findByTitle(title, userId);

  if (existingCategory) {
    throw new AppError("Category with this title already exists", 409);
  }

  return await categoryModel.create(title, userId);
};

export const getCategoryById = async (categoryId, userId) => {
  const category = await categoryModel.findById(categoryId, userId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export const getAllCategories = async (userId) => {
  return (await categoryModel.findAll(userId)) || [];
};

export const getNotesByCategory = async (
  categoryId,
  userId,
  paginationOptions
) => {
  const { page, limit, sortBy, order } = paginationOptions;

  const category = await categoryModel.findById(categoryId, userId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const notes = await categoryModel.getNotes(categoryId, userId, {
    page,
    limit,
    sortBy,
    order,
  });

  return {
    categoryTitle: category.title,
    notes,
  };
};

export const updateCategory = async (categoryId, categoryTitle, userId) => {
  const category = await categoryModel.findById(categoryId, userId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const existingCategory = await categoryModel.findByTitle(
    categoryTitle,
    userId
  );

  if (existingCategory) {
    throw new AppError("Category with this title already exists", 409);
  }

  return await categoryModel.update(categoryId, categoryTitle);
};

export const deleteCategory = async (categoryId, userId) => {
  const category = await categoryModel.findById(categoryId, userId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return await categoryModel.delete(categoryId);
};
