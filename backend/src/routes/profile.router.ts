import { upsertProfile } from "@/controllers/profile.controller";
import { Router } from "express";

const profileRouter = Router();

// profileRouter.get("/:id", getUser);
profileRouter.post("/", upsertProfile);
// userRouter.put("/profile", isAuthenticated, updateProfile);

export default profileRouter;
