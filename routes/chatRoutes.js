import express from "express";
import { chatControllers } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/", chatControllers.getChats);
chatRouter.post("/", chatControllers.createChat);
chatRouter.put("/:id", chatControllers.updateChat);
chatRouter.delete("/:id", chatControllers.deleteChat);
chatRouter.post("/:chatId/messages", chatControllers.sendMessage);

export default chatRouter;
