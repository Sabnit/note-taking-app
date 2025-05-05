import * as authService from "../services/auth.service.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/token.js";
import serverConfig from "../config.js";
import AppError from "../utils/AppError.js";

export const signup = async (req, res, next) => {
  try {
    const { body } = req;

    const newUser = await authService.signup(body);

    return res.status(201).json({
      status: "success",
      message: "User signed up successfully.",
      data: {
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { body } = req;

    const { accessToken, refreshToken } = await authService.login(body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: serverConfig.nodeEnv === "production",
      sameSite: serverConfig.nodeEnv === "production" ? "Strict" : "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: serverConfig.nodeEnv === "production" ? "Strict" : "Lax",
    });

    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: serverConfig.nodeEnv === "production",
      sameSite: serverConfig.nodeEnv === "production" ? "Strict" : "Lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: serverConfig.nodeEnv === "production",
      sameSite: serverConfig.nodeEnv === "production" ? "Strict" : "Lax",
    });

    return res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await authService.forgotPassword(email);
    return res.status(200).json({
      status: "success",
      message: "Reset link sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    // const { email } = req.body;
    console.log(req.params);
    console.log(req.query);

    const data = await authService.resetPassword();
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new AppError("Refresh token missing", 404);

    const userPayload = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken({
      id: userPayload.userId,
      email: userPayload.email,
    });

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: serverConfig.nodeEnv === "production",
        sameSite: serverConfig.nodeEnv === "production" ? "Strict" : "Lax",
      })
      .json({ message: "Access token refreshed" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid refresh token", 401));
    }
    next(error);
  }
};
