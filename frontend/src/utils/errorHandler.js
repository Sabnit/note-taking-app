import { showToast } from "./toast";

export function handleApiError(error) {
  // Initialize variables to store error information
  let errorMessage = "An unexpected error occurred";
  let errorCode = null;
  let status = null;
  let url = null;

  // Extract basic information if available
  if (error?.response) {
    status = error.response.status;
    url = error.config?.url;

    const responseData = error.response.data;

    // Extract error message from various possible structures
    if (responseData?.message) {
      errorMessage = responseData.message;
      errorCode = responseData.errorCode;
    } else if (responseData?.error?.message) {
      errorMessage = responseData.error.message;
      errorCode = responseData.error.errorCode;
    } else if (responseData?.statusText) {
      errorMessage = responseData.statusText;
    } else if (error.response.statusText) {
      errorMessage = error.response.statusText;
    }

    // Organize common HTTP status codes for user-friendly error messages
    if (!errorMessage || errorMessage === "An unexpected error occurred") {
      switch (status) {
        case 400:
          errorMessage = "Invalid request. Please check your data.";
          break;
        case 401:
          errorMessage = "Authentication required. Please log in again.";
          break;
        case 403:
          errorMessage = "You don't have permission to access this note.";
          break;
        case 404:
          errorMessage = "Note not found.";
          break;
        case 409:
          errorMessage = "Conflict detected. Data has been updated already.";
          break;
        case 429:
          errorMessage = "Too many requests. Please try again later.";
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = "Server error. Please try again later.";
          break;
      }
    }
  } else if (error?.message) {
    // Handle network errors or other non-response errors
    if (error.message.includes("Network Error")) {
      errorMessage =
        "Network connection issue. Please check your internet connection.";
    } else if (error.message.includes("timeout")) {
      errorMessage = "Request timed out. Please try again.";
    } else {
      errorMessage = error.message;
    }
  }

  // Show toast notification with the error message
  showToast.error(errorMessage);

  // Return standardized error object for further handling if needed
  const errorInfo = {
    message: errorMessage,
    code: errorCode,
    status,
    url,
  };

  throw errorInfo;
}
