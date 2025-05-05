import api from "../utils/api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

/**
 * Creates a new category
 * @param {Object} categoryData - Data for creating a category
 * @param {string} categoryData.title - Title of the category
 * @returns {Promise<Object>} - Created category object
 */
export const createCategory = async ({ categoryData }) => {
  const response = await api.post(
    `${API_ENDPOINTS.CATEGORY_ROUTES.CREATE}`,
    categoryData
  );
  return response.data;
};

/**
 * Fetches all categories
 * @returns {Promise<Array>} - Array of categories
 */
export const getCategories = async () => {
  const response = await api.get(`${API_ENDPOINTS.CATEGORY_ROUTES.GET_ALL}`);
  const { categories } = response.data;
  return { categories: Object.values(categories) };
};

/**
 * Fetches a category by its ID
 * @param {string} id - Category ID
 * @returns {Promise<Object>} - Category object
 */
export const getCategoryById = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.CATEGORY_ROUTES.BY_ID(id)}`);
  return response.data;
};

/**
 * Fetches a category notes by its ID
 * @param {string} id - Category ID
 * @returns {Promise<Object>} - Category object
 */
export const getCategoryNotesById = async (id, paginationOptions = {}) => {
  const { page, limit, sortBy, order } = paginationOptions;

  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  if (sortBy) params.append("sortBy", sortBy);
  if (order) params.append("order", order);

  const queryString = params.toString() ? `${params.toString()}` : "";

  const response = await api.get(
    `${API_ENDPOINTS.CATEGORY_ROUTES.GET_NOTES(id)}${queryString}`
  );

  const { categoryTitle, notes } = response.data.data;

  return {
    categoryTitle,
    notes: Object.values(notes.items),
    pagination: notes.pagination,
  };
};

/**
 * Updates an existing category
 * @param {string} id - Category ID
 * @param {Object} categoryData - Data to update
 * @param {string} [categoryData.title] - Updated title
 * @param {Array} [categoryData.categoryIds] - Updated category IDs
 * @param {string} [categoryData.content] - Updated content
 * @param {string} [categoryData.date] - Updated date
 * @returns {Promise<Object>} - Updated category object
 */
export const updateCategory = async (id, categoryData) => {
  const response = await api.put(
    `${API_ENDPOINTS.CATEGORY_ROUTES.BY_ID(id)}`,
    categoryData
  );
  return response.data;
};

/**
 * Deletes a category
 * @param {string} id - Category ID
 * @returns {Promise<Object>} - Deletion result
 */
export const deleteCategory = async (id) => {
  const response = await api.delete(
    `${API_ENDPOINTS.CATEGORY_ROUTES.BY_ID(id)}`
  );
  return response.data;
};
