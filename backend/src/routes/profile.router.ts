import { getProfile, upsertProfile } from "@/controllers/profile.controller";
import { upsertProfileSchema } from "@/validations/profile.validaiton";
import { validateData } from "@fvoid/shared-lib";
import { Router } from "express";

const profileRouter = Router();

// profileRouter.get("/:id", getUser);
profileRouter.post(
  "/edit/:id",
  validateData(upsertProfileSchema),
  upsertProfile
);
profileRouter.get("/user/:id", getProfile);
// userRouter.put("/profile", isAuthenticated, updateProfile);

export default profileRouter;
