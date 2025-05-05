import jwt from "jsonwebtoken";
import crypto from "crypto";

import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant/jwt.js";
import serverConfig from "../config.js";

export const generateAccessToken = ({ id, firstName, lastName, email }) => {
  return jwt.sign(
    { userId: id, firstName, lastName, email: email },
    serverConfig.jwt.accessTokenSecret,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const generateRefreshToken = ({ id, firstName, lastName, email }) => {
  return jwt.sign(
    { userId: id, firstName, lastName, email: email },
    serverConfig.jwt.refreshTokenSecret,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, serverConfig.jwt.accessTokenSecret);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, serverConfig.jwt.refreshTokenSecret);
};

export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
