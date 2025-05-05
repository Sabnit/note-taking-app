/**
 * Client Side error messages
 */
export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_EXISTS: "Email already exists",
    UNAUTHORIZED: "You need to login first",
    TOKEN_EXPIRED: "Your session has expired, please login again",
  },
  AUTH_FORM: {
    FIRST_NAME_REQUIRED: "Please enter your first name",
    LAST_NAME_REQUIRED: "Please enter your last name",
    EMAIL_REQUIRED: "Please enter a valid email",
    PASSWORD_REQUIRED: "Please enter your password",
    PASSWORD_INVALID_PATTERN:
      "Password must contain at least one lowercase, one uppercase, one number, and one special character",
    PASSWORD_INCORRECT: "Password doesn't match",
  },
  API: {
    DEFAULT: "Something went wrong, please try again later",
    NETWORK: "Unable to connect to server",
    TIMEOUT: "Request timed out, please try again",
  },
  APP_FORM: {
    CATEGORY_TITLE_REQUIRED: "Title must be at least 3 characters long",
    NOTE_TITLE_REQUIRED: "Title must be at least 5 characters long",
    NOTE_DESCRIPTION_REQUIRED: "Please enter note description",
    NOTE_DATE_REQUIRED: "Please enter note date",
    NOTE_CATEGORY_ID_REQUIRED: "Please select at least one categoryId",
  },
};
