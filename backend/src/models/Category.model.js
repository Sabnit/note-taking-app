import { CATEGORY_SORT_FIELDS } from "../constant/sortFields.js";
import { BaseModel } from "./Base.model.js";

/**
 * Model for Category Operations
 */
class CategoryModel extends BaseModel {
  constructor() {
    super("category");
    this.validSortFields = [...CATEGORY_SORT_FIELDS];
  }

  /**
   * Create new category
   * @param {string} title - Category data with
   * @param {number} userId - Category data with
   * @returns {Promise<Object>}
   */
  async create(title, userId) {
    return super.create({ title, userId });
  }

  /**
   * Find category by id
   * @param {number} categoryId
   * @param {number} userId
   * @returns {Promise<Object>}
   */
  async findById(categoryId, userId) {
    const whereClause = {
      AND: [{ id: categoryId }, { userId }],
    };

    return super.findById(whereClause, {});
  }

  /**
   * Find category by title
   * @param {string} categoryTitle
   * @param {number} userId
   * @returns {Promise<Object>} - Category object or null if not found
   */
  async findByTitle(categoryTitle, userId) {
    return super.findByTitle(categoryTitle, userId);
  }

  /**
   * Find all categories for a user with pagination
   * @param {number} userId
   * @returns {Promise<Object>} - All categories object
   */
  async findAll(userId, options = {}) {
    const whereClause = { userId };
    return super.findAll(whereClause, options);
  }

  /**
   * Get notes for a specific category with pagination
   * @param {number} categoryId
   * @param {number} userId
   * @param {object} paginationOptions - Pagination options
   * @param {number} paginationOptions.page - Page number
   * @param {number} paginationOptions.limit - Page size
   * @param {string} paginationOptions.sortBy - Sort field
   * @param {string} paginationOptions.order - Sort order (asc/desc)
   * @returns {Promise<Object>}
   */
  async getNotes(categoryId, userId, { page, limit, sortBy, order }) {
    const include = {
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        isComplete: true,
      },
    };

    const whereClause = {
      userId,
      categories: {
        some: {
          id: categoryId,
        },
      },
    };

    return super.pagination(whereClause, {
      page,
      limit,
      sortBy,
      order,
      include,
      validSortFields: this.validSortFields,
      customModel: "note",
    });
  }

  /**
   * Update a category
   * @param {number} categoryId
   * @param {string} categoryName
   * @returns {Promise<Object>} - Updated category object
   */
  async update(categoryId, categoryName) {
    const data = { title: categoryName };
    return super.update(categoryId, data);
  }

  /**
   * Delete a category
   * @param {*} categoryId
   * @returns {Promise<Object>} - Deleted category
   */
  async delete(categoryId) {
    return super.delete(categoryId);
  }
}

export const categoryModel = new CategoryModel();
