import ctrWrapper from "../decorators/ctrlWrapper.js";
import {
  find,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  addMessageToChat,
} from "../services/chatServices.js";
import HttpError from "../helpers/HttpError.js";

export const getChats = ctrWrapper(async (req, res) => {
  const chats = await find();
  if (!chats || chats.length === 0) {
    throw HttpError(404, "No chats found");
  }
  res.status(200).json(chats);
});

export const createChat = ctrWrapper(async (req, res) => {
  const { firstName, lastName } = req.body;
  const userId = req.user.id;

  if (!firstName || !lastName) {
    throw HttpError(400, "First name and last name are required");
  }

  const newChat = await create(userId, { firstName, lastName });

  res.status(201).json(newChat);
});

export const updateChat = ctrWrapper(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    throw HttpError(400, "First name and last name are required");
  }

  const updatedChat = await findByIdAndUpdate(id, { firstName, lastName });
  if (!updatedChat) {
    throw HttpError(404, "Chat not found");
  }

  res.status(200).json(updatedChat);
});

export const deleteChat = ctrWrapper(async (req, res) => {
  const { id } = req.params;

  const deletedChat = await findByIdAndDelete(id);
  if (!deletedChat) {
    throw HttpError(404, "Chat not found");
  }

  res.status(200).json({ message: "Chat deleted" });
});

export const sendMessage = ctrWrapper(async (req, res) => {
  const { chatId, content, sender } = req.body;

  if (!chatId || !content || !sender) {
    throw HttpError(400, "Chat ID, content, and sender are required");
  }

  const message = await addMessageToChat(chatId, content, sender);

  res.status(201).json(message);
});
