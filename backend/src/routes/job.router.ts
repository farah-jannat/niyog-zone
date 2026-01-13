import { Router } from "express";
import {
  createJob,
  deleteJob,
  getCompanyJobs,
  getJob,
  getJobs,
  getLatestJobs,
  getRecruiterJobs,
  getSimilarJobs,
  updateJob,
} from "@/controllers/job.controller";
import { verifyClientToken } from "@/middlewares/verify-client-token.middleware";
import { config } from "@/config";

const jobRouter = Router();

// jobRouter.post("/jobs", isAuthenticated, postJob);
jobRouter.get("/latest", getLatestJobs);
jobRouter.get("/company/:id", getCompanyJobs);
jobRouter.get("/recruiter/:id", getRecruiterJobs);
jobRouter.get("/similar/:category", getSimilarJobs);
jobRouter.get("/:id", getJob);
jobRouter.get("/", getJobs);

jobRouter.post("/", verifyClientToken(config.JWT_TOKEN), createJob);
jobRouter.put("/", updateJob)
jobRouter.delete("/:id", deleteJob)
// jobRouter.get("/jobs/:id", getJobById);
// jobRouter.get("/jobs/admin/:id", isAuthenticated, getAdminJobs);

export default jobRouter;
