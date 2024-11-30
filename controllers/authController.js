import ctrWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { registerUser, loginUser, protect } from "../services/authServices.js";

export const register = ctrWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw HttpError(400, "All fields are required");
  }

  const { user, token } = await registerUser(
    firstName,
    lastName,
    email,
    password
  );
  res.status(201).json({ user, token });
});

export const login = ctrWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(400, "Email and password are required");
  }

  const { user, token } = await loginUser(email, password);
  res.status(200).json({ user, token });
});

export const protectRoute = ctrWrapper(async (req, res) => {
  res.status(200).json({ message: "Authorized", userId: req.user._id });
});
