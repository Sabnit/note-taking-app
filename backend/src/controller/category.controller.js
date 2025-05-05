import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constant/pagination.js";
import * as categoryServices from "../services/category.service.js";

export const createCategory = async (req, res, next) => {
  try {
    const {
      body: { title },
      user: { userId },
    } = req;

    console.log(req.body);

    const normalizedTitle = title.trim();

    const category = await categoryServices.createCategory({
      title: normalizedTitle,
      userId,
    });

    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { userId } = req.user;

    const category = await categoryServices.getCategoryById(categoryId, userId);

    res.status(200).json({
      status: "success",
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// export const getAllCategories = async (req, res, next) => {
//   try {
//     const { userId } = req.user;
//     const {
//       page = DEFAULT_PAGE,
//       limit = DEFAULT_PAGE_SIZE,
//       sortBy,
//       order,
//     } = req.query;

//     const paginationOptions = {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       sortBy,
//       order,
//     };

//     const categories = await categoryServices.getAllCategories(
//       userId,
//       paginationOptions
//     );

//     res.status(200).json({
//       status: "success",
//       message: "Categories retrieved successfully",
//       categories,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const getAllCategories = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const categories = await categoryServices.getAllCategories(userId);

    res.status(200).json({
      status: "success",
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getNotesByCategory = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id);
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

    const data = await categoryServices.getNotesByCategory(
      categoryId,
      userId,
      paginationOptions
    );

    res.status(200).json({
      status: "success",
      message: "Notes retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { title } = req.body;
    const { userId } = req.user;

    const normalizedTitle = title.trim();

    const updatedCategory = await categoryServices.updateCategory(
      categoryId,
      normalizedTitle,
      userId
    );

    res.status(200).json({
      status: "success",
      message: "Category title changed successfully",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { userId } = req.user;

    const category = await categoryServices.deleteCategory(categoryId, userId);

    res.status(204).json({
      status: "success",
      message: `${category.title} has been removed successfully`,
    });
  } catch (error) {
    next(error);
  }
};
