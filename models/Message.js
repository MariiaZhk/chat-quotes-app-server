import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: String, enum: ["user", "bot"], required: true },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat" },
  timestamp: { type: Date, default: Date.now },
});

export default model("Message", MessageSchema);
