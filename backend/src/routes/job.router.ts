import { Router } from "express";
import { getJobs, getLatestJobs } from "@/controllers/job.controller";
import isAuthenticated from "@/middlewares/isAuthenticated";

const jobRouter = Router();

// jobRouter.post("/jobs", isAuthenticated, postJob);
jobRouter.get("/latest", getLatestJobs);
jobRouter.get("/", getJobs);
// jobRouter.get("/jobs/:id", getJobById);
// jobRouter.get("/jobs/admin/:id", isAuthenticated, getAdminJobs);

export default jobRouter;
