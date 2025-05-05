import api from "../utils/api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

/**
 * Fetches all notes with pagination and sorting options
 * @param {Object} paginationOptions - Options for pagination and sorting
 * @param {number} paginationOptions.page - Page number
 * @param {number} paginationOptions.limit - Number of items per page
 * @param {string} paginationOptions.sortBy - Field to sort by
 * @param {string} paginationOptions.order - Sort order ('asc' or 'desc')
 * @returns {Promise<Array>} - Array of notes
 */
export const getNotes = async (paginationOptions = {}) => {
  const { page, limit, sortBy, order } = paginationOptions;

  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  if (sortBy) params.append("sortBy", sortBy);
  if (order) params.append("order", order);

  const queryString = params.toString() ? `${params.toString()}` : "";

  const response = await api.get(
    `${API_ENDPOINTS.NOTE_ROUTES.GET_ALL}${queryString}`
  );

  const { items, pagination } = response.data.notes;

  return { notes: Object.values(items), pagination };
};

/**
 * Fetches a note by its ID
 * @param {string} id - Note ID
 * @returns {Promise<Object>} - Note object
 */

export const getNoteById = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.NOTE_ROUTES.BY_ID(id)}`);
  return response.data;
};

/**
 * Creates a new note
 * @param {Object} noteData - Data for creating a note
 * @param {string} noteData.title - Title of the note
 * @param {Array} noteData.categoryIds - Array of category IDs or category objects
 * @param {string} noteData.content - Content of the note
 * @param {string} noteData.date - Date of the note
 * @returns {Promise<Object>} - Created note object
 */
export const createNote = async (noteData) => {
  const response = await api.post(
    `${API_ENDPOINTS.NOTE_ROUTES.CREATE}`,
    noteData
  );
  return response.data;
};

/**
 * Updates an existing note
 * @param {string} id - Note ID
 * @param {Object} noteData - Data to update
 * @param {string} [noteData.title] - Updated title
 * @param {Array} [noteData.categoryIds] - Updated category IDs
 * @param {string} [noteData.content] - Updated content
 * @param {string} [noteData.date] - Updated date
 * @returns {Promise<Object>} - Updated note object
 */
export const updateNote = async (id, noteData) => {
  const response = await api.patch(
    `${API_ENDPOINTS.NOTE_ROUTES.BY_ID(id)}`,
    noteData
  );
  return response.data;
};

/**
 * Deletes a note
 * @param {string} id - Note ID
 * @returns {Promise<Object>} - Deletion result
 */
export const deleteNote = async (id) => {
  const response = await api.delete(`${API_ENDPOINTS.NOTE_ROUTES.BY_ID(id)}`);
  return response.data;
};
