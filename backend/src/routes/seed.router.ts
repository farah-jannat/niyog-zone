// ** Third party imports
import seedUser from "@/controllers/seed.controller";
import { Router } from "express";

const seedRouter = Router();

seedRouter.put("/user/:count", seedUser);

export default seedRouter;
