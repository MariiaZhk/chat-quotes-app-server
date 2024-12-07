import Message from "../models/Message.js";

export const chatSocketHandler = (io) => {
  return (socket) => {
    console.log(`User connected: ${socket.id}, User ID: ${socket.user?.id}`);

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.user?.id} joined chat: ${chatId}`);
    });

    socket.on("send_message", async (data) => {
      const { chatId, content } = data;

      const newMessage = new Message({
        content,
        sender: socket.user?.id,
        chatId,
      });
      await newMessage.save();

      io.to(chatId).emit("receive_message", newMessage);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  };
};
