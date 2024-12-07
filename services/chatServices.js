import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const createChat = async (userId, chatData) => {
  const newChat = await Chat.create({ ...chatData, userId });
  await User.findByIdAndUpdate(userId, { $push: { chats: newChat._id } });
  return newChat;
};

export const getChats = async (userId) => {
  const user = await User.findById(userId).populate("chats");
  return user.chats;
};

export const deleteChat = async (chatId, userId) => {
  await Chat.findByIdAndDelete(chatId);
  await User.findByIdAndUpdate(userId, { $pull: { chats: chatId } });
};

export const updateChatName = async (chatId, newName) => {
  return Chat.findByIdAndUpdate(chatId, { name: newName }, { new: true });
};

// export const addMessage = async (chatId, content, sender, senderType) => {
//   const message = new Message({
//     content,
//     sender,
//     senderType,
//     timestamp: new Date(),
//   });

//   await message.save();

//   return Chat.findByIdAndUpdate(
//     chatId,
//     { $push: { messages: message } },
//     { new: true }
//   );
// };
export const getChatMessages = async (chatId) => {
  const chat = await Chat.findById(chatId).populate("messages");
  return chat ? chat.messages : null;
};
