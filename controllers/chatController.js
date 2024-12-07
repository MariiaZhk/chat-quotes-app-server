import {
  createChat,
  getChats,
  deleteChat,
  updateChatName,
  getChatMessages,
} from "../services/chatServices.js";
import ctrWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

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

// const addMessageToChat = async (req, res) => {
//   const { id: chatId } = req.params;
//   const { content, sender, senderType } = req.body;
//   const updatedChat = await addMessage(chatId, content, sender, senderType);
//   res.status(200).json(updatedChat);
// };

const getMessageHistory = async (req, res) => {
  const { id: chatId } = req.params;
  const messages = await getChatMessages(chatId);
  if (!messages) {
    throw HttpError(404, "Chat not found or no messages available");
  }
  res.status(200).json(messages);
};

export default {
  addChat: ctrWrapper(addChat),
  getAllChats: ctrWrapper(getAllChats),
  removeChat: ctrWrapper(removeChat),
  updateChat: ctrWrapper(updateChat),
  getMessageHistory: ctrWrapper(getMessageHistory),
};
