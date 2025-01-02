import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10d" });
};

export const signUp = async (data) => {
  const { password } = data;
  const hashedPassword = await hashPassword(password);
  return User.create({ ...data, password: hashedPassword });
};

export const setToken = (id, token = null) => {
  return User.findByIdAndUpdate(id, { token }, { new: true });
};

export const findUser = (filter) => {
  return User.findOne(filter);
};

export const findUserById = (id) => {
  return User.findById(id);
};

export const updateUser = (id, data) => User.findByIdAndUpdate(id, data);

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { generateToken };
