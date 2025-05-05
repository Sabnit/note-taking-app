import bcrypt from "bcrypt";

import {
  generateAccessToken,
  generateRandomToken,
  generateRefreshToken,
} from "../utils/token.js";
import AppError from "../utils/AppError.js";
import serverConfig from "../config.js";
import { resetPasswordTemplate } from "../email/templates/resetPasswordTemplate.js";
import transporter from "../config/emailService.js";
import { userModel } from "../models/User.model.js";

const SALT_ROUNDS = 10;

export const signup = async (data) => {
  const { firstName, lastName, email, password } = data;

  const emailExists = await userModel.findByEmail(email);

  if (emailExists) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    firstName,
    lastName,
    email,
  };

  await userModel.create({ ...newUser, password: hashedPassword });

  return newUser;
};

export const login = async (data) => {
  const { email, password } = data;

  const user = await userModel.findByEmail(email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const refreshToken = generateRefreshToken({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  return {
    accessToken,
    refreshToken,
  };
};

export const forgotPassword = async (email) => {
  const emailExists = await userModel.findByEmail(email);

  if (!emailExists) {
    throw new AppError("Email doesn't exist", 404);
  }

  const token = generateRandomToken();

  const resetLink = `http://localhost:5173/auth/reset-password/${token}`;

  const mailOptions = {
    from: serverConfig.mailer.sender,
    to: email,
    subject: "Password Reset Link",
    html: resetPasswordTemplate(resetLink),
  };

  await transporter.sendMail(mailOptions);

  return email;
};

export const resetPassword = async (params) => {};
