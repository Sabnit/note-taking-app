import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../utils/api";

export const getCurrentUser = async () => {
  const response = await api.get(API_ENDPOINTS.USER_ROUTES.GET_CURRENT_USER);
  return response.data;
};
