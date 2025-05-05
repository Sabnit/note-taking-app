import serverConfig from "../config.js";

/**
 * Global Error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Default to 500 if no status code is passed
  err.statusCode = err.statusCode || 500;

  // Log error for debugging
  console.error(`ERROR (${err.statusCode}): ${err.message}`);

  // Send standardized error response
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
    ...(serverConfig.nodeEnv === "development" && { stack: err.stack }),
  });
};
