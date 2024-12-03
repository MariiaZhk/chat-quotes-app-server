import express from "express";
import chatControllers from "../controllers/chatController.js";
import { authenticate } from "../middlewares/authenticate.js";

const chatRouter = express.Router();

chatRouter.get("/", authenticate, chatControllers.getAllChats); // Отримати всі чати
chatRouter.post("/", authenticate, chatControllers.addChat); // Додати новий чат
chatRouter.delete("/:id", authenticate, chatControllers.removeChat); // Видалити чат
chatRouter.put("/:id", authenticate, chatControllers.renameChat); // Змінити назву чату

export default chatRouter;
