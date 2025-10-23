import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "@/controllers/application.controller";
import isAuthenticated from "@/middlewares/isAuthenticated";
import { Router } from "express";

const applicationRouter = Router();

applicationRouter.post("/applications", isAuthenticated, applyJob);
applicationRouter.get("/applications/user/:id", isAuthenticated, getAppliedJobs);
applicationRouter.get("/applications/job/:id", isAuthenticated, getApplicants);
applicationRouter.put("/applications/:id", isAuthenticated, updateStatus);

// router.route("/apply/:id").get(isAuthenticated, applyJob);
// router.route("/get").get(isAuthenticated, getAppliedJobs);
// router.route("/:id/applicants").get(isAuthenticated, getApplicants);
// router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default applicationRouter;
