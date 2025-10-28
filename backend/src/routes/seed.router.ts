// ** Third party imports
// import { seedJobs, seedUsers } from "@/controllers/seed.controller";
import { seed } from "@/controllers/seed.controller";
import { Router } from "express";

const seedRouter = Router();

seedRouter.put("/", seed);

// seedRouter.put("/user/:count", seedUsers);
// seedRouter.put("/company/:count", seedUsers);
// seedRouter.put("/job/:count", seedJobs);

export default seedRouter;
