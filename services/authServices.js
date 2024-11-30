import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (firstName, lastName, email, password) => {
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("User already exists");
  }

  const user = new User({ firstName, lastName, email, password });
  await user.save();

  const token = generateToken(user._id);

  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return { user, token };
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const protect = async (token) => {
  if (!token) {
    throw new Error("Not authorized, no token");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
