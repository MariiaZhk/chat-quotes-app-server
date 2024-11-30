import {
  signUp,
  loginUser,
  setToken,
  findUser,
} from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrWrapper from "../decorators/ctrlWrapper.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../schemas/userSchemas.js";

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await findUser({ email });
  if (existingUser) {
    throw HttpError(400, "User with this email already exists");
  }

  const newUser = await signUp({ firstName, lastName, email, password });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "23h" });

  await setToken(newUser._id, token);

  res.status(201).json({ user: newUser, token });
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.details[0].message);
  }

  const { email, password } = req.body;

  const { user, token } = await loginUser(email, password);

  res.status(200).json({ user, token });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await setToken(_id, null);
  res.status(204).end();
};

export default {
  register: ctrWrapper(register),
  login: ctrWrapper(login),
  logout: ctrWrapper(logout),
};
