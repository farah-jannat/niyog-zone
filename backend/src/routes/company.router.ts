import {
  getCompany,
  getRecruiterCompanies,
} from "@/controllers/company.controller";
import { Router } from "express";

const companyRouter = Router();

// companyRouter.post("/companies", isAuthenticated, registerCompany);
// companyRouter.get("/companies", isAuthenticated, getCompany);
// companyRouter.get("/companies/:id", isAuthenticated, getCompanyById);
// companyRouter.put("/companies/:id", isAuthenticated, updateCompany);

companyRouter.get("/recruiter/:id", getRecruiterCompanies);
companyRouter.get("/:id", getCompany);

export default companyRouter;
