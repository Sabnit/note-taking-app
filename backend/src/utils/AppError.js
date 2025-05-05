/**
 * Custom error class for application errors
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; //Indicates this is a known operational error not a bug or system crash

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
