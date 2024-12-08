import HttpError from "../helpers/HttpError.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
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

export const addMessage = async (chatId, content, sender) => {
  console.log("Chat ID:", chatId);
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new Error("Chat not found");
  }
  const newMessage = new Message({
    content,
    sender,
    chatId,
  });
  await newMessage.save();
  chat.messages.push(newMessage._id);
  await chat.save();

  return newMessage;
};
