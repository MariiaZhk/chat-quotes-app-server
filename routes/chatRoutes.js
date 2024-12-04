import express from "express";
import chatControllers from "../controllers/chatController.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  addChatSchema,
  addMessageSchema,
  renameChatSchema,
} from "../schemas/schemas.js";
import validateBody from "../helpers/validateBody.js";

const chatRouter = express.Router();

chatRouter.get("/", authenticate, chatControllers.getAllChats);
chatRouter.post(
  "/",
  authenticate,
  validateBody(addChatSchema),
  chatControllers.addChat
);
chatRouter.put(
  "/:id",
  authenticate,
  validateBody(renameChatSchema),
  chatControllers.renameChat
);
chatRouter.put("/:id", authenticate, chatControllers.renameChat);
chatRouter.post(
  "/:chatId/messages",
  validateBody(addMessageSchema),
  authenticate,
  chatControllers.addMessage
);

export default chatRouter;
