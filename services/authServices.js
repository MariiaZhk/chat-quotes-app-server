import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signUp = async (data) => {
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 6);
  return User.create({ ...data, password: hashedPassword });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  let token = user.token;
  if (!token) {
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "23h",
    });
    await setToken(user._id, token);
  }

  return { user, token };
};

export const setToken = (id, token = null) => {
  return User.findByIdAndUpdate(id, { token });
};

export const findUser = (filter) => {
  return User.findOne(filter);
};

export const findUserById = (id) => {
  return User.findById(id);
};

export const updateUser = (id, data) => User.findByIdAndUpdate(id, data);
