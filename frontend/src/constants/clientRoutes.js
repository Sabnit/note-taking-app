/**
 * Collection of client side routes
 */

const BASE_AUTH_URL = "/auth";
const BASE_APP_URL = "/app";

export const CLIENT_ROUTES = {
  AUTH_ROUTES: {
    LOGIN: `${BASE_AUTH_URL}/login`,
    SIGNUP: `${BASE_AUTH_URL}/signup`,
    FORGOT_PASSWORD: `${BASE_AUTH_URL}/forgot-password`,
    RESET_PASSWORD: `${BASE_AUTH_URL}/reset-password/:token`,
  },
  APP_ROUTE: {
    NOTES: `${BASE_APP_URL}/notes`,
    CATEGORIES: `${BASE_APP_URL}/categories`,
    CATEGORY: `${BASE_APP_URL}/category/:id`,
    getCategoryPath: (id) => `${BASE_APP_URL}/category/${id}`,
    PROFILE: `${BASE_APP_URL}/profile`,
  },
  WELCOME: "/",
};
