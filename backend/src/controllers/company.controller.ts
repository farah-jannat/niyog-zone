// import { Company } from "../models/company.model.js";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

import { db } from "@/db";
import { companyTable } from "@/schemas";
import { catchError } from "@/utils/catch-error.util";
import {
  BadRequestError,
  ConnectionError,
  NotFoundError,
} from "@fvoid/shared-lib";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

// export const registerCompany = async (req, res) => {
//   try {
//     const { companyName } = req.body;
//     if (!companyName) {
//       return res.status(400).json({
//         message: "Company name is required",
//         success: false,
//       });
//     }

//     let company = await Company.findOne({ name: companyName });
//     if (company) {
//       return res.status(400).json({
//         message: "You can't register same company.",
//         success: false,
//       });
//     }
//     company = await Company.create({
//       name: companyName,
//       userId: req.id,
//     });
//     return res.status(201).json({
//       message: "Company registered successfully.",
//       company,
//       success: true,
//     });
//   } catch (err) {
//     console.log("error while registering company");
//   }
// };

// export const getCompany = async (req, res) => {
//   try {
//     const userId = req.id;
//     const companies = await Company.find({ userId });
//     if (!companies) {
//       return res.status(404).json({
//         message: "Companies not found.",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       companies,
//       success: true,
//     });
//   } catch (err) {
//     console.log("eroor while fetching companies", err);
//   }
// };

// export const getCompanyById = async (req, res) => {
//   try {
//     const companyId = req.params.id;
//     console.log("this is companyid", companyId);
//     const company = await Company.findOne({ _id: companyId });
//     if (!company) {
//       return res.status(404).json({
//         message: "Company not found.",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       company,
//       success: true,
//     });
//   } catch (err) {
//     console.log("error while fetching this company", err);
//   }
// };

// export const updateCompany = async (req, res) => {
//   try {
//     const { name, description, website, location } = req.body;
//     console.log(
//       "this are datas coming from frontend:",
//       name,
//       description,
//       website,
//       location
//     );

//     const file = req.file;
//     //the cloudinary will be here
//     const fileUri = getDataUri(file);
//     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//     const logo = cloudResponse.secure_url;
//     const updateData = { name, description, website, location, logo };

//     const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!company) {
//       return res.status(404).json({
//         message: "Company not found.",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       message: "Company information updated.",
//       company,
//       success: true,
//     });
//   } catch (error) {
//     console.log("error while updating company date", error);
//   }
// };

export const getCompany = async (req: Request, res: Response) => {
  let { job, user } = req.query;

  const { id } = req.params;

  if (!id) throw new BadRequestError("Id not found!");

  const [companyError, company] = await catchError(
    db.query.companyTable.findFirst({
      where: eq(companyTable.id, id),

      with: {
        jobs: job ? true : undefined,
        user: user ? true : undefined,
      },
    })
  );

  if (companyError) throw new ConnectionError("Database Error!");
  if (!company) throw new NotFoundError();

  return res.json(company);
};

export const getRecruiterCompanies = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw new BadRequestError("Id not found!");

  const [companyError, companies] = await catchError(
    db.query.companyTable.findMany({
      where: eq(companyTable.userId, id),
    })
  );

  if (companyError) throw new ConnectionError("Database Error !");
  if (!companies) throw new NotFoundError();

  return res.json(companies);
};
