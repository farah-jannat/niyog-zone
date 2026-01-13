import {
  createCompany,
  deleteCompany,
  editCompany,
  getCompany,
  getRecruiterCompanies,
} from "@/controllers/company.controller";
import { Router } from "express";

const companyRouter = Router();


companyRouter.get("/recruiter/:id", getRecruiterCompanies);
companyRouter.get("/:id", getCompany);
companyRouter.post("/", createCompany);
companyRouter.delete("/:id", deleteCompany)
companyRouter.put("/", editCompany)

export default companyRouter;
