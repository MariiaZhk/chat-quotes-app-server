import Chat from "../models/Chat.js";
import User from "../models/User.js";
import Message from "../models/Message.js";

export const find = async () => {
  return Chat.find().populate("messages");
};

export const create = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const chat = new Chat({
    user: userId,
    firstName: data.firstName,
    lastName: data.lastName,
  });

  return chat.save();
};

export const findByIdAndUpdate = async (id, data) => {
  const chat = await Chat.findByIdAndUpdate(id, data, { new: true }).populate(
    "messages"
  );
  if (!chat) {
    throw new Error("Chat not found");
  }

  return chat;
};

export const findByIdAndDelete = async (id) => {
  const chat = await Chat.findByIdAndDelete(id);
  if (!chat) {
    throw new Error("Chat not found");
  }

  return chat;
};

export const addMessageToChat = async (chatId, content, sender) => {
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new Error("Chat not found");
  }

  const message = new Message({
    content,
    sender,
    chatId: chat._id,
  });

  await message.save();
  chat.messages.push(message);
  await chat.save();

  return message;
};
