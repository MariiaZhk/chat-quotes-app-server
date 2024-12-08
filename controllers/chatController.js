import {
  createChat,
  getChats,
  deleteChat,
  updateChatName,
  addMessage,
} from "../services/chatServices.js";
import ctrWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import Chat from "../models/Chat.js";

const addChat = async (req, res) => {
  const { _id: userId } = req.user;
  const { name } = req.body;
  if (!name) {
    throw HttpError(400, "Chat name is required");
  }
  const chat = await createChat(userId, { name });
  res.status(201).json(chat);
};

const getAllChats = async (req, res) => {
  const { _id: userId } = req.user;
  console.log("User ID:", userId);
  const chats = await getChats(userId);
  res.status(200).json(chats);
};

const removeChat = async (req, res) => {
  const { id: chatId } = req.params;
  const { _id: userId } = req.user;
  await deleteChat(chatId, userId);
  res.status(204).end();
};

const updateChat = async (req, res) => {
  const { id: chatId } = req.params;
  const { name } = req.body;
  if (!name) {
    throw HttpError(400, "New chat name is required");
  }
  const updatedChat = await updateChatName(chatId, name);
  if (!updatedChat) {
    throw HttpError(404, "Chat not found");
  }
  res.status(200).json(updatedChat);
};

export const addMessageToChat = async (req, res) => {
  const { id: chatId } = req.params;
  const { content, sender, timestamp } = req.body;
  if (!content || !sender) {
    throw HttpError(400, "Message text and sender are required");
  }
  try {
    const newMessage = await addMessage(chatId, content, sender, timestamp);
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add message" });
  }
};

const getChatMessages = async (req, res) => {
  const { id: chatId } = req.params;

  const chat = await Chat.findById(chatId).populate({
    path: "messages",
    populate: { path: "sender", select: "name" },
  });
  if (!chat) {
    throw HttpError(404, "Chat not found");
  }
  res.status(200).json(chat.messages);
};

export default {
  addChat: ctrWrapper(addChat),
  getAllChats: ctrWrapper(getAllChats),
  removeChat: ctrWrapper(removeChat),
  updateChat: ctrWrapper(updateChat),
  addMessageToChat: ctrWrapper(addMessageToChat),
  getChatMessages: ctrWrapper(getChatMessages),
};
