import { config } from "@/config";
import {
  getAuthUser,
  login,
  logout,
  register,
} from "@/controllers/auth.controller";
import { verifyClientToken } from "@/middlewares/verify-client-token.middleware";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.get("/auth-user", verifyClientToken(config.JWT_TOKEN), getAuthUser);

export default authRouter;
