import HttpError from "../helpers/HttpError.js";
import { findUserById } from "../services/authServices.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(HttpError(401, "Not authorized"));
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(id);

    if (!user || !user.token) {
      return next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(HttpError(401, "Token expired"));
    } else if (error.name === "JsonWebTokenError") {
      next(HttpError(401, "Invalid token"));
    } else {
      next(HttpError(401, "Not authorized"));
    }
  }
};
