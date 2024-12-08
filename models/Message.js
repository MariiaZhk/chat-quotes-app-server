import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
