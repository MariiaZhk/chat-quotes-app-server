import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const { DB_HOST, PORT = 4000 } = process.env;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.use("/api/chats", require("./routes/chatRoutes"));
// app.use("/api/messages", require("./routes/messageRoutes"));
