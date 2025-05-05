import { checkSchema, validationResult, matchedData } from "express-validator";
import AppError from "../utils/AppError.js";

export const validate = (schema) => async (req, res, next) => {
  await Promise.all(
    checkSchema(schema).map((validation) => validation.run(req))
  );

  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessages = result
      .array()
      .map((err) => `${err.path}: ${err.msg}`)
      .join(", ");
    throw new AppError(errorMessages, 400);
  }
  req.body = matchedData(req, { locations: ["body"] });
  next();
};
