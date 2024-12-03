import Joi from "joi";
import { emailRegexp } from "../constants/regexp.js";

const emailPasswordSchema = {
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
};

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  ...emailPasswordSchema,
});

export const loginSchema = Joi.object({
  ...emailPasswordSchema,
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  email: Joi.string().pattern(emailRegexp),
  oldPassword: Joi.string().min(6),
  newPassword: Joi.string().min(6),
  gender: Joi.string().valid("man", "woman"),
});

export const verifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
