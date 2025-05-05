export const getNoteSchema = {
  id: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Note id is required",
    },
  },
};

export const createNoteSchema = {
  title: {
    isLength: {
      options: {
        min: 5,
        max: 100,
      },
      errorMessage: "Note title must be 5 to 100 characters long",
    },
    notEmpty: {
      errorMessage: "Note title is required",
    },
    isString: {
      errorMessage: "Note title must be string",
    },
  },
  description: {
    isString: {
      errorMessage: "Description must be string",
    },
    optional: true,
  },
  date: {
    isISO8601: {
      errorMessage: "Date must be a valid ISO8601 date string",
    },
    isString: {
      errorMessage: "Description must be string",
    },
    notEmpty: {
      errorMessage: "Date is required",
    },
  },
  categoryIds: {
    notEmpty: {
      errorMessage: "Category id is required",
    },
    custom: {
      options: (value) => {
        if (Array.isArray(value)) {
          return value.every((id) => !isNaN(parseInt(id)));
        }
        return !value || !isNaN(parseInt(value));
      },
      errorMessage: "Category IDs must be valid integers",
    },
  },
  isComplete: {
    isBoolean: {
      errorMessage: "isComplete must be a boolean",
    },
    optional: true,
  },
};

export const updateNoteSchema = {
  title: {
    isLength: {
      options: {
        min: 5,
        max: 100,
      },
      errorMessage: "Note title must be 5 to 100 characters long",
    },
    isString: {
      errorMessage: "Note title must be string",
    },
    optional: true,
  },
  description: {
    isString: {
      errorMessage: "Description must be string",
    },
    optional: true,
  },
  date: {
    isISO8601: {
      errorMessage: "Date must be a valid ISO8601 date string",
    },
    isString: {
      errorMessage: "Date must be string",
    },
    optional: true,
  },
  categoryIds: {
    optional: true,
    custom: {
      options: (value) => {
        if (Array.isArray(value)) {
          return value.every((id) => !isNaN(parseInt(id)));
        }
        return !value || !isNaN(parseInt(value));
      },
      errorMessage: "Category IDs must be valid integers",
    },
  },
  isComplete: {
    isBoolean: {
      errorMessage: "isComplete must be a boolean",
    },
    optional: true,
  },
};

export const deleteNoteSchema = {
  id: {
    notEmpty: {
      errorMessage: "Note id is required",
    },
  },
};
