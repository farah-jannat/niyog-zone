import { db } from "@/db";
import { companyTable } from "@/schemas";
import { catchError } from "@/utils/catch-error.util";
import type {
  EditCompanyInput,
  InsertCompanyType,
} from "@/validations/company.validation";
import {
  BadRequestError,
  ConnectionError,
  NotFoundError,
  uploads,
} from "@fvoid/shared-lib";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

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

export const createCompany = async (req: Request, res: Response) => {
  const formData = req.body as InsertCompanyType;

  // upload image to cloudinary
  const uploadResult = await uploads(formData.logo ?? "");

  // prepare data
  const companyData = {
    ...formData,
    logo: uploadResult?.secure_url,
  };

  const [companyError, [company]] = await catchError(
    db.insert(companyTable).values(companyData).returning()
  );

  if (companyError) throw new ConnectionError("Error creating job!");

  return res.json(company);
};

export const editCompany = async (req: Request, res: Response) => {
  const formData = req.body as EditCompanyInput;

  const [companyError, oldCompany] = await catchError(
    db.query.companyTable.findFirst({
      where: eq(companyTable.id, formData.id),
    })
  );

  if (companyError) throw new ConnectionError("Database Error!");

  if (formData.logo !== oldCompany?.logo) {
    const uploadResult = await uploads(formData.logo ?? "");
    formData.logo = uploadResult?.secure_url;
  }

  const [errCompanyUpdate, [company]] = await catchError(
    db
      .update(companyTable)
      .set(formData)
      .where(eq(companyTable.id, formData.id))
      .returning()
  );

  if (errCompanyUpdate)
    console.log(
      "######################3 Db error updating profile " + errCompanyUpdate
    );
  return res.json(company);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id ##########3", id);
  const [companyError, companyId] = await catchError(
    db.delete(companyTable).where(eq(companyTable.id, id!))
  );

  if (companyError) throw new ConnectionError("Error deleting company!");
  return res.json(companyId);
};
