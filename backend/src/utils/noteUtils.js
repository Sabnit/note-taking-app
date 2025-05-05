import AppError from "./AppError.js";

export const prepareCategoryIds = (categoryIds) => {
  if (!categoryIds) return [];

  const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
  return ids.map((id) => ({ id: parseInt(id) }));
};

export const parseDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(`${dateString}T00:00:00.00Z`);

  if (isNaN(date.getDate())) {
    throw new AppError("Invalid date format. Use YYYY=MM-DD", 400);
  }

  return date;
};
