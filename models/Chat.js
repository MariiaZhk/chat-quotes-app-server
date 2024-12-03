import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
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
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
