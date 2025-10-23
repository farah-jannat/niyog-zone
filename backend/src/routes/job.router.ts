import { Router } from "express";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "@/controllers/job.controller";
import isAuthenticated from "@/middlewares/isAuthenticated";

const jobRouter = Router();

jobRouter.post("/jobs", isAuthenticated, postJob);
jobRouter.get("/jobs", getAllJobs);
jobRouter.get("/jobs/:id", getJobById);
jobRouter.get("/jobs/admin/:id", isAuthenticated, getAdminJobs);

export default jobRouter;
