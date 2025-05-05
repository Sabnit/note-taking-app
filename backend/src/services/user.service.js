import { decode } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/token.js";
import AppError from "../utils/AppError.js";
import { userModel } from "../models/User.model.js";

export const getCurrentUser = async (accessToken) => {
  const decoded = verifyAccessToken(accessToken);
  if (!decode) {
    new AppError("Invalid access token", 401);
  }

  return decoded;
};

export const getUserById = async (id) => {
  const user = await userModel.findById(id);
};
export const updateUser = async (params) => {};
export const deleteUser = async (params) => {};
