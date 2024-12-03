import {
  createChat,
  getChats,
  deleteChat,
  updateChatName,
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

const renameChat = async (req, res) => {
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

export default {
  addChat: ctrWrapper(addChat),
  getAllChats: ctrWrapper(getAllChats),
  removeChat: ctrWrapper(removeChat),
  renameChat: ctrWrapper(renameChat),
};
