export const signupSchema = {
  firstName: {
    isLength: {
      options: {
        min: 5,
        max: 25,
      },
      errorMessage: "First name must be 5 to 25 characters long",
    },
    notEmpty: {
      errorMessage: "First name is required",
    },
    isString: {
      errorMessage: "First name must be string",
    },
  },
  lastName: {
    isLength: {
      options: {
        min: 5,
        max: 25,
      },
      errorMessage: "Last name must be 5 to 25 characters long",
    },
    notEmpty: {
      errorMessage: "Last name is required",
    },
    isString: {
      errorMessage: "Last name must be string",
    },
  },
  email: {
    isEmail: true,
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
    custom: {
      options: (value) => {
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        return hasLowercase && hasUppercase && hasNumber && hasSpecialChar;
      },
      errorMessage:
        "Password must contain at least one lowercase, one uppercase, one number, and one special character",
    },
  },
};

export const loginSchema = {
  email: {
    isEmail: true,
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
};
