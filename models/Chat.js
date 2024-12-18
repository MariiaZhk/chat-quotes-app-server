// Chat.js
import mongoose from "mongoose";
import { Schema } from "mongoose";

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
  messages: [
    {
      content: { type: String, required: true },
      sender: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

chatSchema.pre("save", function (next) {
  if (this.messages.length > 200) {
    this.messages = this.messages.slice(-200);
  }
  next();
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
