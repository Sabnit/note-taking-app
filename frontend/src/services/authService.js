import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { CLIENT_ROUTES } from "../constants/clientRoutes";
import api from "../utils/api";

export const login = async (userdata) => {
  const response = await api.post(API_ENDPOINTS.AUTH_ROUTES.LOGIN, userdata);
  return response;
};

export const signup = async (userData) => {
  const response = await api.post(API_ENDPOINTS.AUTH_ROUTES.SIGNUP, userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(API_ENDPOINTS.AUTH_ROUTES.LOGOUT);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post(API_ENDPOINTS.AUTH_ROUTES.REFRESH);
  return response.data;
};

export const forgetPassword = async (email) => {
  const response = await api.post(
    API_ENDPOINTS.AUTH_ROUTES.FORGOT_PASSWORD,
    email
  );
  return response.data;
};

export const resetPassword = async (password) => {
  const response = await api.post(
    API_ENDPOINTS.AUTH_ROUTES.RESET_PASSWORD,
    password
  );
  return response.data;
};
