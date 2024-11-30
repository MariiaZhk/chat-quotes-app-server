import { Schema, model } from "mongoose";
import User from "./User.js";

const ChatSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

export default model("Chat", ChatSchema);
