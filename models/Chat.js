// Chat.js
import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
});

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
  messages: [messageSchema],
});
chatSchema.pre("save", function (next) {
  if (this.messages.length > 100) {
    this.messages = this.messages.slice(-100);
  }
  next();
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
