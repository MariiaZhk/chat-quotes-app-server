import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import chatRouter from "./routes/chatRoutes.js";
import authRouter from "./routes/authRoutes.js";
import createPredefinedChats from "./scripts/predefinedChats.js";
import { chatSocketHandler } from "./socetHandlers/chatSocet.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-quotes-app-client.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const { DB_HOST, PORT, JWT_SECRET } = process.env;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

app.use("/chats", chatRouter);
app.use("/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    createPredefinedChats();
    server.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", chatSocketHandler(io));
