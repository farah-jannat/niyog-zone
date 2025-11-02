import { config } from "@/config";
import {
  checkApplication,
  createApplication,
} from "@/controllers/application.controller";
import { verifyClientToken } from "@/middlewares/verify-client-token.middleware";
import { Router } from "express";

const applicationRouter = Router();

applicationRouter.get(
  "/:applicantId/:jobId",
  verifyClientToken(config.JWT_TOKEN),
  checkApplication
);

applicationRouter.post(
  "/",
  verifyClientToken(config.JWT_TOKEN),
  createApplication
);

// applicationRouter.post("/applications", isAuthenticated, applyJob);
// applicationRouter.get(
//   "/applications/user/:id",
//   isAuthenticated,
//   getAppliedJobs
// );
// applicationRouter.get("/applications/job/:id", isAuthenticated, getApplicants);
// applicationRouter.put("/applications/:id", isAuthenticated, updateStatus);

export default applicationRouter;
