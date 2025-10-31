import {
  getUser,
  login,
  logout,
  register,
  updateProfile,
} from "@/controllers/user.controller";
import isAuthenticated from "@/middlewares/isAuthenticated";
import { Router } from "express";

const userRouter = Router();

// userRouter.post("/register", register);
// userRouter.post("/login", login);
// userRouter.get("/logout", logout);
userRouter.get("/:id", getUser);
// userRouter.put("/profile", isAuthenticated, updateProfile);

export default userRouter;
