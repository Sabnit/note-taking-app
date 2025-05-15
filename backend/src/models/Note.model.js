import { NOTE_SORT_FIELDS } from "../constant/sortFields.js";
import { BaseModel } from "./Base.model.js";

/**
 * Model for Note Operations
 */
class NoteModel extends BaseModel {
  constructor() {
    super("note");
    this.validSortFields = [...NOTE_SORT_FIELDS];
  }

  /**
   * Create a note
   * @param {Object} noteData - Note data with categories
   * @param {string} noteData.title - Note title
   * @param {Array<number>} noteData.categoryIds - Array of category IDs
   * @param {string} noteData.description - Note description
   * @param {string} noteData.date - Note date
   * @param {number} noteData.userId - User ID
   * @returns {Promise<Object>} - Created note object
   */
  async create({ title, categoryIds, description, date, userId }) {
    const data = {
      title,
      description,
      date,
      userId,
      categories: {
        connect: categoryIds,
      },
    };

    return super.create(data, {
      include: {
        categories: true,
      },
    });
  }

  /**
   * Find note by title
   * @param {string} noteTitle
   * @param {number} userId
   * @returns {Promise<Object>} - Note object or null if not found
   */
  async findByTitle(noteTitle, userId) {
    return super.findByTitle(noteTitle, userId);
  }

  /**
   * Find note by id
   * @param {number} noteId
   * @param {number} userId
   * @returns {Promise<Object>} - Note object or null if not found
   */
  async findById(noteId, userId) {
    const whereClause = {
      AND: [{ id: noteId }, { userId }],
    };

    const options = {
      include: {
        categories: true,
      },
    };

    return super.findById(whereClause, options);
  }

  /**
   * Find all notes for a user with pagination
   * @param {number} userId
   * @param {object} paginationOptions - Pagination options
   * @param {number} paginationOptions.page - Page number
   * @param {number} paginationOptions.limit - Page size
   * @param {string} paginationOptions.sortBy - Sort field
   * @param {string} paginationOptions.order - Sort order (asc/desc)
   * @returns {Promise<Object>} - Paginated notes object
   */
  async findAll(userId, { page, limit, sortBy, order }) {
    const includeObject = {
      include: {
        categories: true,
      },
    };
    const whereClause = { userId };

    return super.pagination(whereClause, {
      page,
      limit,
      sortBy,
      order,
      validSortFields: this.validSortFields,
      includeObject,
    });
  }

  /**
   * Update a note
   * @param {number} noteId
   * @param {Object} updateData - Note data to update with categories
   * @returns - Updated note object
   */
  async update(noteId, updateData) {
    const { categoryIds, ...otherData } = updateData;

    let prismaUpdateData = { ...otherData };

    if (categoryIds) {
      prismaUpdateData.categories = {
        set: [],
        connect: categoryIds,
      };
    }

    const includeObject = {
      include: {
        categories: true,
      },
    };

    return super.update(noteId, prismaUpdateData, includeObject);
  }

  /**
   *
   * @param {number} noteId
   * @returns {Promise<Object>} - Deleted note object
   */
  async delete(noteId) {
    const includeObject = {
      include: {
        categories: true,
      },
    };

    return super.delete(noteId, includeObject);
  }
}

export const noteModel = new NoteModel();
