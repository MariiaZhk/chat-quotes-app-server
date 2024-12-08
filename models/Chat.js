// Chat.js
import mongoose from "mongoose";
import { Schema } from "mongoose";
import { messageSchema } from "./Message.js";

const chatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  predefined: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});
chatSchema.pre("save", function (next) {
  if (this.messages.length > 100) {
    this.messages = this.messages.slice(-100);
  }
  next();
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
