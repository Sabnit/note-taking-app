import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import serverConfig from "../config.js";

export const auth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new AppError("Access token missing", 404);
  }
  try {
    const decoded = jwt.verify(accessToken, serverConfig.jwt.accessTokenSecret);

    if (!decoded.id && !decoded.email) {
      throw new AppError("Not authorized", 401);
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Access token expired", 401));
    }

    return next(new AppError("Invalid access token", 401));
  }
};
