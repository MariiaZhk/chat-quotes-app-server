import {
  find,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  addMessageToChat,
} from "../services/chatServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrWrapper from "../decorators/ctrlWrapper.js";

const getChats = async (req, res) => {
  const userId = req.user.id;
  const chats = await find(userId);

  res.status(200).json(chats);
};

const createChat = async (req, res) => {
  const userId = req.user.id;
  const newChat = await create(userId, req.body);

  res.status(201).json(newChat);
};

const updateChat = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  const updatedChat = await findByIdAndUpdate(id, { firstName, lastName });
  if (!updatedChat) {
    throw HttpError(404, "Chat not found");
  }

  res.status(200).json(updatedChat);
};

const deleteChat = async (req, res) => {
  const { id } = req.params;

  const deletedChat = await findByIdAndDelete(id);
  if (!deletedChat) {
    throw HttpError(404, "Chat not found");
  }

  res.status(200).json({ message: "Chat deleted" });
};

const sendMessage = async (req, res) => {
  const { chatId, content, sender } = req.body;

  if (!content || !sender) {
    throw HttpError(400, "Content and sender are required");
  }

  const message = await addMessageToChat(chatId, content, sender);

  res.status(201).json(message);
};

export const chatControllers = {
  getChats: ctrWrapper(getChats),
  createChat: ctrWrapper(createChat),
  updateChat: ctrWrapper(updateChat),
  deleteChat: ctrWrapper(deleteChat),
  sendMessage: ctrWrapper(sendMessage),
};
