import { Router } from "express";
import { getLatestJobs } from "@/controllers/job.controller";
import isAuthenticated from "@/middlewares/isAuthenticated";

const jobRouter = Router();

// jobRouter.post("/jobs", isAuthenticated, postJob);
// jobRouter.get("/", getAllJobs);
jobRouter.get("/latest", getLatestJobs);
// jobRouter.get("/jobs/:id", getJobById);
// jobRouter.get("/jobs/admin/:id", isAuthenticated, getAdminJobs);

export default jobRouter;
