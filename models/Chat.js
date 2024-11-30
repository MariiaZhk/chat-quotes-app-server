import { Schema, model } from "mongoose";
import User from "./User.js";

const ChatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: User, required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

export default model("Chat", ChatSchema);
