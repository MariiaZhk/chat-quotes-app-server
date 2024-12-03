import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const createChat = async (userId, chatData) => {
  const newChat = await Chat.create({ ...chatData, userId });
  await User.findByIdAndUpdate(userId, { $push: { chats: newChat._id } });
  return newChat;
};

export const getChats = async (userId) => {
  const user = await User.findById(userId).populate("chats");
  return user.chats;
};

export const deleteChat = async (chatId, userId) => {
  await Chat.findByIdAndDelete(chatId);
  await User.findByIdAndUpdate(userId, { $pull: { chats: chatId } });
};

export const updateChatName = async (chatId, newName) => {
  return Chat.findByIdAndUpdate(chatId, { name: newName }, { new: true });
};
