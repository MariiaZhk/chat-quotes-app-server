import { addMessageToChat } from "../controllers/chatController.js";
import Chat from "../models/Chat.js";

export const chatSocketHandler = (io) => {
  return (socket) => {
    console.log(`User connected: ${socket.id}, User ID: ${socket.user?.id}`);

    socket.on("join_chat", async (chatId) => {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        socket.emit("error", { message: "Chat not found" });
        return;
      }
      socket.join(chatId);
      console.log(`User ${socket.user?.id} joined chat: ${chatId}`);
    });

    socket.on("send_message", async (data) => {
      try {
        const { userId, content, sender, timestamp } = data;
        const newMessage = await addMessageToChat(
          userId,
          content,
          sender,
          timestamp
        );
        io.to(chatId).emit("receive_message", newMessage);
      } catch (err) {
        console.error(err);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  };
};
