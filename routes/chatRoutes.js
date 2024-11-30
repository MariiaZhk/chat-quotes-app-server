import express from "express";
import {
  getChats,
  createChat,
  updateChat,
  deleteChat,
  sendMessage,
} from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/", getChats);

chatRouter.post("/", createChat);

chatRouter.put("/:id", updateChat);

chatRouter.delete("/:id", deleteChat);

chatRouter.post("/:chatId/messages", sendMessage);

export default chatRouter;
