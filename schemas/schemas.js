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
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Chat name cannot be empty",
    "string.min": "Chat name must be at least 2 characters long",
    "string.max": "Chat name cannot exceed 100 characters",
    "any.required": "Chat name is required",
  }),
});

export const renameChatSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "New chat name cannot be empty",
    "string.min": "New chat name must be at least 2 characters long",
    "string.max": "New chat name cannot exceed 100 characters",
    "any.required": "New chat name is required",
  }),
});

export const addMessageSchema = Joi.object({
  content: Joi.string().min(1).max(500).required().messages({
    "string.empty": "Message content cannot be empty",
    "string.min": "Message content must be at least 1 character long",
    "string.max": "Message content cannot exceed 500 characters",
    "any.required": "Message content is required",
  }),
});
// export const updateUserSchema = Joi.object({
//   name: Joi.string().min(2).max(20),
//   email: Joi.string().pattern(emailRegexp),
//   oldPassword: Joi.string().min(6),
//   newPassword: Joi.string().min(6),
//   gender: Joi.string().valid("man", "woman"),
// });
