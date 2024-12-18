import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signUp = async (data) => {
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 6);
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
