import { Schema, model } from "mongoose";
import User from "./User.js";
import Chat from "./Chat.js";

const MessageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", index: true },
  timestamp: { type: Date, default: Date.now },
});

export default model("Message", MessageSchema);
