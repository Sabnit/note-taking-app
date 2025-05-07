import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { refreshToken } from "../services/authService";
import { handleApiError } from "./errorHandler";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const isAuthRoute = (url) => {
  const loginUrl = API_ENDPOINTS.AUTH_ROUTES.LOGIN;
  const refreshUrl = API_ENDPOINTS.AUTH_ROUTES.REFRESH;
  return url === loginUrl || url === refreshUrl;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/auth/login";
        return Promise.reject(handleApiError(refreshError));
      }
    }

    return Promise.reject(handleApiError(error));
  }
);

export default api;
