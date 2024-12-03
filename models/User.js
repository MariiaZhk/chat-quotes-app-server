import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { emailRegexp } from "../constants/regexp.js";

const UserSchema = new Schema(
  {
    firstName: { type: String, minLength: 2, maxLength: 20, required: true },
    lastName: { type: String, minLength: 2, maxLength: 20, required: true },
    password: {
      type: String,
      minLength: 6,
      maxLength: 64,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    // token: {
    //   type: String,
    //   default: null,
    // },
  },
  { versionKey: false, timestamps: true }
);

export default model("User", UserSchema);
