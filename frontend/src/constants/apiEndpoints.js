/**
 * Collection of the API routes
 */
const BASE_AUTH_URL = "/auth";
const BASE_USER_URL = "/user";
const BASE_NOTE_URL = "/note";
const BASE_CATEGORY_URL = "/category";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH_ROUTES: {
    SIGNUP: `${BASE_AUTH_URL}/signup`,
    LOGIN: `${BASE_AUTH_URL}/login`,
    LOGOUT: `${BASE_AUTH_URL}/logout`,
    FORGOT_PASSWORD: `${BASE_AUTH_URL}/forgot-password`,
    RESET_PASSWORD: `${BASE_AUTH_URL}/reset-password`,
    VERIFY_RESET_TOKEN: `${BASE_AUTH_URL}/verify-reset-token/:token`,
    REFRESH: `${BASE_AUTH_URL}/refresh`,
  },

  // User endpoints
  USER_ROUTES: {
    GET_CURRENT_USER: "/user/me",
    BY_ID: (id) => `${BASE_USER_URL}/${id}`,
  },

  // Note endpoints
  NOTE_ROUTES: {
    CREATE: `${BASE_NOTE_URL}/`,
    GET_ALL: `${BASE_NOTE_URL}?`,
    BY_ID: (id) => `${BASE_NOTE_URL}/${id}`,
  },

  // Category endpoints
  CATEGORY_ROUTES: {
    CREATE: `${BASE_CATEGORY_URL}/`,
    GET_ALL: `${BASE_CATEGORY_URL}/`,
    BY_ID: (id) => `${BASE_CATEGORY_URL}/${id}`,
    GET_NOTES: (id) => `${BASE_CATEGORY_URL}/${id}/notes?`,
  },
};
