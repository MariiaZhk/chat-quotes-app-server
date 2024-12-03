import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chatRouter from "./routes/chatRoutes.js";
import authRouter from "./routes/authRoutes.js";
import createPredefinedChats from "./scripts/predefinedChats.js";

dotenv.config();

const app = express();
const { DB_HOST, PORT } = process.env;

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
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
