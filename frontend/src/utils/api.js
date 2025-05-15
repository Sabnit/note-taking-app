import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { refreshToken } from "../services/authService";
import { handleApiError } from "./errorHandler";

// Flag to prevent multiple refresh token attempts in parallel
let isRefreshingToken = false;
let refreshSubscribers = [];

// Function to add callbacks to retry original requests after token refresh
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Function to notify all subscribers that token has been refreshed
const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

// Function to notify all subscribers that token refresh has failed
const onTokenRefreshFailed = (error) => {
  refreshSubscribers.forEach((callback) => callback(error));
  refreshSubscribers = [];
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Determine if a route is an auth route (like login or refresh)
const isAuthRoute = (url) => {
  const loginUrl = API_ENDPOINTS.AUTH_ROUTES.LOGIN;
  const refreshUrl = API_ENDPOINTS.AUTH_ROUTES.REFRESH;
  const getCurrentUserURL = API_ENDPOINTS.USER_ROUTES.GET_CURRENT_USER;

  return url === loginUrl || url === refreshUrl || url === getCurrentUserURL;
};

// Create an event that components can listen to for auth failures
export const createAuthErrorEvent = (error) => {
  const event = new CustomEvent("auth-error", {
    detail: {
      message: error.message || "Authentication failed",
      status: error.status || 401,
      isRefreshTokenError: true,
    },
  });
  window.dispatchEvent(event);
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(handleApiError(error));
    }

    if (originalRequest && !originalRequest.hasOwnProperty("_retry")) {
      originalRequest._retry = false;
    }

    const isUnauthorized =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute(originalRequest.url);

    // Handle Unauthorized errors (except for auth routes)
    if (isUnauthorized) {
      if (isRefreshingToken) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((refreshError) => {
            if (refreshError) {
              // Token refresh failed
              reject(refreshError);
            } else {
              // Token refresh succeeded
              resolve(api(originalRequest));
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshingToken = true;

      try {
        await refreshToken();

        // Token refresh succeeded, retry all queued requests
        isRefreshingToken = false;
        onTokenRefreshed();

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshingToken = false;

        // Create an error with the refresh token error flag
        const authError = {
          ...refreshError,
          isRefreshTokenError: true,
          message: "Session expired. Please login again.",
        };

        // Notify subscribers about the failed refresh
        onTokenRefreshFailed(authError);

        // Dispatch a global event for auth error
        createAuthErrorEvent(authError);

        // Return the error to be handled by the component
        return Promise.reject(authError);
      }
    }

    // For non-401 errors
    return Promise.reject(handleApiError(error));
  }
);

export default api;
