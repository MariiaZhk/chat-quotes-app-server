import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

const predefinedUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "user1@example.com",
    password: "password123",
    welcomeMessage: "Hello, how are you?",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "user2@example.com",
    password: "password123",
    welcomeMessage: "Hey, what's up?",
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    email: "user3@example.com",
    password: "password123",
    welcomeMessage: "Hi there!",
  },
];

const createPredefinedUsersAndChats = async (newUserId) => {
  try {
    const newUser = await User.findById(newUserId);
    if (!newUser) {
      console.log("New user not found.");
      return;
    }

    for (let userData of predefinedUsers) {
      let user = await User.findOne({ email: userData.email });

      if (!user) {
        user = new User({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        });

        await user.save();
        console.log(`Predefined user ${user.firstName} created.`);
      }

      const chat = new Chat({
        users: [newUser._id, user._id],
      });

      const initialMessage = new Message({
        sender: user._id,
        content: userData.welcomeMessage,
        timestamp: new Date(),
      });

      await initialMessage.save();

      chat.messages = [initialMessage._id];
      await chat.save();

      console.log(
        `Predefined chat created for ${newUser.firstName} and ${user.firstName}`
      );
    }
  } catch (error) {
    console.error("Error creating predefined users and chats:", error);
  }
};

export default createPredefinedUsersAndChats;
