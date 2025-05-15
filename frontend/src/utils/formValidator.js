import { showToast } from "./toast";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export const validateNoteForm = (formData) => {
  const newErrors = {};

  if (formData.title.length < 5) {
    newErrors.title = ERROR_MESSAGES.APP_FORM.NOTE_TITLE_REQUIRED;
  }
  if (!formData.description) {
    newErrors.description = ERROR_MESSAGES.APP_FORM.NOTE_DESCRIPTION_REQUIRED;
  }

  if (!formData.date) {
    newErrors.date = ERROR_MESSAGES.APP_FORM.NOTE_DATE_REQUIRED;
  }

  if (formData.categoryIds.length === 0) {
    newErrors.categoryIds = ERROR_MESSAGES.APP_FORM.NOTE_CATEGORY_ID_REQUIRED;
  }

  Object.entries(newErrors).forEach((error) => showToast.error(error[1]));

  return Object.keys(newErrors).length === 0;
};

export const validateCategoryForm = (formData) => {
  const newErrors = {};

  if (formData.title.length < 3) {
    newErrors.title = ERROR_MESSAGES.APP_FORM.CATEGORY_TITLE_REQUIRED;
  }
  Object.entries(newErrors).forEach((error) => showToast.error(error[1]));

  return Object.keys(newErrors).length === 0;
};
