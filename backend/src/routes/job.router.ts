import { Router } from "express";
import {
  getCompanyJobs,
  getJob,
  getJobs,
  getLatestJobs,
  getRecruiterJobs,
  getSimilarJobs,
} from "@/controllers/job.controller";
import isAuthenticated from "@/middlewares/isAuthenticated";

const jobRouter = Router();

// jobRouter.post("/jobs", isAuthenticated, postJob);
jobRouter.get("/latest", getLatestJobs);
jobRouter.get("/company/:id", getCompanyJobs);
jobRouter.get("/recruiter/:id", getRecruiterJobs);
jobRouter.get("/similar/:category", getSimilarJobs);
jobRouter.get("/:id", getJob);
jobRouter.get("/", getJobs);
// jobRouter.get("/jobs/:id", getJobById);
// jobRouter.get("/jobs/admin/:id", isAuthenticated, getAdminJobs);

export default jobRouter;
