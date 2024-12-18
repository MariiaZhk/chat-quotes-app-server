// import Chat from "../models/Chat.js";

// const predefinedChats = [
//   { name: "General Chat" },
//   { name: "Announcements" },
//   { name: "Best Advice" },
// ];

// const createPredefinedChats = async () => {
//   const existingChats = await Chat.find({ predefined: true });

//   if (existingChats.length === 0) {
//     for (const chat of predefinedChats) {
//       await Chat.create({ ...chat, predefined: true });
//     }
//     console.log("Predefined chats created");
//   } else {
//     console.log("Predefined chats already exist");
//   }
// };

// export default createPredefinedChats;
