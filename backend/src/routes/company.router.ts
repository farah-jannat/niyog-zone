import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "@/controllers/company.controller";
import isAuthenticated from "@/middlewares/isAuthenticated";
import { Router } from "express";

const companyRouter = Router();

// companyRouter.post("/companies", isAuthenticated, registerCompany);
// companyRouter.get("/companies", isAuthenticated, getCompany);
// companyRouter.get("/companies/:id", isAuthenticated, getCompanyById);
// companyRouter.put("/companies/:id", isAuthenticated, updateCompany);

export default companyRouter;
