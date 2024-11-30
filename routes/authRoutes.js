import express from "express";
import authControllers from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authControllers.register
);
authRouter.post("/login", validateBody(loginSchema), authControllers.login);
authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
