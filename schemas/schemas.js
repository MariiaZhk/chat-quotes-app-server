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

export const addChatSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});

export const renameChatSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});

export const addMessageSchema = Joi.object({
  content: Joi.string().required(),
  // sender: Joi.alternatives()
  //   .try(
  //     Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  //     Joi.string().valid("quotable")
  //   )
  //   .required(),
  // senderType: Joi.string().valid("User", "Bot").required(),
  sender: Joi.string().required(),
  senderType: Joi.string().valid("You", "Quotable").required(),
  timestamp: Joi.date().iso().required(),
});
