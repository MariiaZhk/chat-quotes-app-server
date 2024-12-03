import { signUp, setToken, findUser } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrWrapper from "../decorators/ctrlWrapper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();
  const existingUser = await findUser({ email: normalizedEmail });
  if (existingUser) {
    throw HttpError(400, "User with this email already exists");
  }
  const newUser = await signUp(req.body);
  const token = await sign({ email });
  res.status(201).json({
    token,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  const user = await findUser({ email: normalizedEmail });
  if (!user) {
    throw HttpError(401, "Invalid email or password");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Invalid email or password");
  }
  const token = await sign(user);
  res.json({
    token,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await setToken(_id);
  res.status(204).end();
};

const getCurrent = async (req, res) => {
  const { email, findUser, lastName, createdAt } = req.user;
  res.status(200).json({ email, findUser, lastName, createdAt });
};

const sign = async (user) => {
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "23h" });
  await setToken(user._id, token);
  return token;
};

export default {
  register: ctrWrapper(register),
  login: ctrWrapper(login),
  logout: ctrWrapper(logout),
  getCurrent: ctrWrapper(getCurrent),
};
