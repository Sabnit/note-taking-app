import { prisma } from "../prismaClient.js";
import AppError from "../utils/AppError.js";

/**
 * Base model class providing common database operations and pagination
 */
export class BaseModel {
  constructor(modelName) {
    if (!prisma[modelName]) {
      throw new AppError(`Invalid model name: ${modelName}`, 500);
    }
    this.model = prisma[modelName];
    this.modelName = modelName;
  }

  /**
   * Create a new record
   * @param {Object} data - Data to create
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Created record
   */
  async create(data, options = {}) {
    const { include = {} } = options;

    return this.model.create({
      data,
      include,
    });
  }

  /**
   * Get record by Id with optional include
   * @param {number} id - Record Id
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Matched record or null
   */
  async findById(whereOptions, options = {}) {
    const { include = {} } = options;
    return this.model.findFirst({
      where: whereOptions,
      include,
    });
  }

  /**
   * Find by title
   * @param {string} title - Record title
   * @param {number} userId - User id
   * @returns {Promise<Object>}
   */
  async findByTitle(title, userId) {
    return this.model.findFirst({
      where: {
        AND: [{ title: { equals: title, mode: "insensitive" } }, { userId }],
      },
    });
  }

  /**
   * Find by email
   * @param {string} email
   * @returns  {Promise<Object>} - User data
   */
  async findByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }

  /**
   * Get all records
   * @param {number} id -
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Matched record or null
   */
  async findAll(whereOptions = {}, options = {}) {
    const { include = {} } = options;

    return this.model.findMany({
      where: whereOptions,
      include,
    });
  }

  /**
   * Update a record
   * @param {number} id - Record Id
   * @param {Object} data - Data to update
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Updated record
   */
  async update(id, data, options = {}) {
    const { include = {} } = options;

    return this.model.update({
      where: {
        id,
      },
      data,
      include,
    });
  }

  /**
   * Delete a record
   * @param {number} id
   * @returns {Promise<Object>} Deleted record
   */
  async delete(id) {
    return await this.model.delete({
      where: {
        id,
      },
    });
  }

  /**
   *
   * @param {Object} options - Pagination and include options
   * @returns {Promise<Object>} Pagination results
   */
  async pagination(whereClause = {}, options = {}) {
    const {
      page,
      limit,
      sortBy,
      order,
      includeObject = {},
      validSortFields,
      customModel = null,
    } = options;

    const include = includeObject?.include || {};

    const skip = (page - 1) * limit;

    // Validate sortBy field to prevent SQL injection
    const safeSort = validSortFields.includes(sortBy) ? sortBy : "updatedAt";

    //   Validate order direction
    const safeOrder = order === "asc" ? "asc" : "desc";

    // Create orderBy object
    const orderBy = { [safeSort]: safeOrder };

    // Temporarily store the original model if we're using a custom one
    const originalModel = this.model;

    // If customModel is provided, temporarily change this.model
    if (customModel) {
      if (!prisma[customModel]) {
        throw new AppError(`Invalid custom model name: ${customModel}`, 500);
      }
      this.model = prisma[customModel];
    }

    try {
      //  Execute queries in parallel for better performance
      const [total, items] = await Promise.all([
        this.model.count({ where: whereClause }),
        this.model.findMany({
          where: whereClause,
          include,
          orderBy,
          skip,
          take: limit,
        }),
      ]);

      const totalPages = Math.ceil(total / limit);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      // Return items with pagination metadata
      return {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      };
    } finally {
      if (customModel) {
        this.model = originalModel;
      }
    }
  }
}
