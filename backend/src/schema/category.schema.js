export const getCategorySchema = {
  id: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Category id is required",
    },
    isInt: {
      errorMessage: "Category id must be number",
    },
  },
};

export const createCategorySchema = {
  title: {
    isLength: {
      options: {
        min: 3,
        max: 50,
      },
      errorMessage: "Category title must be 5 to 50 characters long",
    },
    notEmpty: {
      errorMessage: "Category title is required",
    },
    isString: {
      errorMessage: "Category title must be string",
    },
  },
};

export const updateCategorySchema = {
  id: {
    notEmpty: {
      errorMessage: "Category id is required",
    },
    isInt: {
      errorMessage: "Category id must be number",
    },
  },
  title: {
    isLength: {
      options: {
        min: 3,
        max: 50,
      },
      errorMessage: "Category title must be 5 to 50 characters long",
    },
    notEmpty: {
      errorMessage: "Category title is required",
    },
    isString: {
      errorMessage: "Category title must be string",
    },
  },
};

export const deleteCategorySchema = {
  id: {
    notEmpty: {
      errorMessage: "Category id is required",
    },
  },
  isInt: {
    errorMessage: "Category id must be number",
  },
};
