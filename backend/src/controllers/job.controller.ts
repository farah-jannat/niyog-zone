import { db } from "@/db";
import { jobTable } from "@/schemas";
import { catchError } from "@/utils/catch-error.util";
import {
  BadRequestError,
  ConnectionError,
  handleAsync,
  NotFoundError,
} from "@fvoid/shared-lib";
import { and, count, desc, eq, gte, ilike, or } from "drizzle-orm";
import type { Request, Response } from "express";

export const getJobs = async (req: Request, res: Response) => {
  let {
    location,
    jobLevel,
    category,
    jobType,
    experience,
    salary,
    keywords,
    vacancy,
    page,
    limit,
  } = req.query;

  const conditions = [];

  // Convert string query params to numbers where expected
  const parsedSalary =
    typeof salary === "string" ? parseInt(salary) : undefined;

  const parsedVacancy =
    typeof vacancy === "string" ? parseInt(vacancy) : undefined;

  // Pagination parameters
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : 10;
  const offset = (parsedPage - 1) * parsedLimit;

  if (parsedVacancy !== undefined && !isNaN(parsedVacancy)) {
    conditions.push(gte(jobTable.vacancy, parsedVacancy));
  }

  // if (parsedSalary !== undefined && !isNaN(parsedSalary)) {
  //   conditions.push(gte(jobTable.salary, parsedSalary));
  // }

  // if (parsedMaxPrice !== undefined && !isNaN(parsedMaxPrice)) {
  //   conditions.push(lte(jobTable.price, parsedMaxPrice));
  // }

  // if (typeof industry === "string" && industry.length > 0) {
  //   conditions.push(eq(jobTable.jobType, deliveryTime as string));
  // }

  if (typeof category === "string" && category.length > 0) {
    conditions.push(eq(jobTable.category, category));
  }

  if (typeof jobType === "string" && jobType.length > 0) {
    conditions.push(eq(jobTable.jobType, jobType));
  }

  if (typeof jobLevel === "string" && jobLevel.length > 0) {
    conditions.push(eq(jobTable.jobLevel, jobLevel));
  }

  if (typeof location === "string" && location.length > 0) {
    conditions.push(eq(jobTable.location, location));
  }

  if (typeof experience === "string" && experience.length > 0) {
    conditions.push(eq(jobTable.experience, experience));
  }

  if (typeof keywords === "string" && keywords.length > 0) {
    conditions.push(
      or(
        ilike(jobTable.category, `%${keywords}%`),
        ilike(jobTable.title, `%${keywords}%`),
        ilike(jobTable.description, `%${keywords}%`)
      )
    );
  }

  // Define the 'where' clause once
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 1. Get total count of matching jobs (applying the same 'where' clause)
  const [totalCountResult] = await handleAsync(
    db
      .select({ count: count(jobTable.id) })
      .from(jobTable)
      .where(whereClause) // Apply the 'where' clause here
  );

  const totalCount = totalCountResult?.count || 0;

  // 2. Get paginated jobs (applying the same 'where' clause, then limit and offset)
  const jobs = await handleAsync(
    db
      .select()
      .from(jobTable)
      .where(whereClause)
      .limit(parsedLimit)
      .offset(offset)
      .orderBy(jobTable.id)
  );

  return res.status(200).json({
    jobs: jobs,
    totalCount: Number(totalCount),
    currentPage: parsedPage,
    limit: parsedLimit,
  });
};

export const getLatestJobs = async (req: Request, res: Response) => {
  let { page, limit } = req.query;

  const conditions = [];

  // Convert string query params to numbers where expected

  // Pagination parameters
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : 10;
  const offset = (parsedPage - 1) * parsedLimit;

  // 1. Get total count of matching jobs (applying the same 'where' clause)
  const [errTotal, totalCountResult] = await catchError(
    db.select({ count: count(jobTable.id) }).from(jobTable)
  );

  if (errTotal) throw new BadRequestError("Something went wrong");

  const totalCount = totalCountResult ? totalCountResult[0]?.count : 0;

  // 2. Get paginated jobs (applying the same 'where' clause, then limit and offset)
  const [errJobs, jobs] = await catchError(
    db
      .select()
      .from(jobTable)
      .limit(parsedLimit)
      .offset(offset)
      .orderBy(desc(jobTable.createdAt))
  );

  if (errJobs) throw new BadRequestError("Something went wrong");

  return res.status(200).json({
    jobs: jobs,
    totalCount: Number(totalCount),
    currentPage: parsedPage,
    limit: parsedLimit,
  });
};

export const getJob = async (req: Request, res: Response) => {
  let { creator, company } = req.query;
  const { id } = req.params;

  if (!id) throw new BadRequestError("Id not found!");

  const [jobError, job] = await catchError(
    db.query.jobTable.findFirst({
      where: eq(jobTable.id, id),
      with: {
        creator: creator ? true : undefined,
        company: company ? true : undefined,
      },
    })
  );

  if (jobError) throw new ConnectionError("Database Error !");
  if (!job) throw new NotFoundError();

  return res.json(job);
};

export const getCompanyJobs = async (req: Request, res: Response) => {
  let {
    location,
    jobLevel,
    category,
    jobType,
    experience,
    salary,
    keywords,
    vacancy,
    page,
    limit,
  } = req.query;

  const { id } = req.params;

  if (!id) throw new BadRequestError("Id not found!");

  const conditions = [];

  conditions.push(eq(jobTable.companyId, id));
  // Convert string query params to numbers where expected
  const parsedSalary =
    typeof salary === "string" ? parseInt(salary) : undefined;

  const parsedVacancy =
    typeof vacancy === "string" ? parseInt(vacancy) : undefined;

  // Pagination parameters
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : 10;
  const offset = (parsedPage - 1) * parsedLimit;

  if (parsedVacancy !== undefined && !isNaN(parsedVacancy)) {
    conditions.push(gte(jobTable.vacancy, parsedVacancy));
  }

  // if (parsedSalary !== undefined && !isNaN(parsedSalary)) {
  //   conditions.push(gte(jobTable.salary, parsedSalary));
  // }

  // if (parsedMaxPrice !== undefined && !isNaN(parsedMaxPrice)) {
  //   conditions.push(lte(jobTable.price, parsedMaxPrice));
  // }

  // if (typeof industry === "string" && industry.length > 0) {
  //   conditions.push(eq(jobTable.jobType, deliveryTime as string));
  // }

  if (typeof category === "string" && category.length > 0) {
    conditions.push(eq(jobTable.category, category));
  }

  if (typeof jobType === "string" && jobType.length > 0) {
    conditions.push(eq(jobTable.jobType, jobType));
  }

  if (typeof jobLevel === "string" && jobLevel.length > 0) {
    conditions.push(eq(jobTable.jobLevel, jobLevel));
  }

  if (typeof location === "string" && location.length > 0) {
    conditions.push(eq(jobTable.location, location));
  }

  if (typeof experience === "string" && experience.length > 0) {
    conditions.push(eq(jobTable.experience, experience));
  }

  if (typeof keywords === "string" && keywords.length > 0) {
    conditions.push(
      or(
        ilike(jobTable.category, `%${keywords}%`),
        ilike(jobTable.title, `%${keywords}%`),
        ilike(jobTable.description, `%${keywords}%`)
      )
    );
  }

  // Define the 'where' clause once
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 1. Get total count of matching jobs (applying the same 'where' clause)
  const [totalCountResult] = await handleAsync(
    db
      .select({ count: count(jobTable.id) })
      .from(jobTable)
      .where(whereClause) // Apply the 'where' clause here
  );

  const totalCount = totalCountResult?.count || 0;

  // 2. Get paginated jobs (applying the same 'where' clause, then limit and offset)
  const jobs = await handleAsync(
    db
      .select()
      .from(jobTable)
      .where(whereClause)
      .limit(parsedLimit)
      .offset(offset)
      .orderBy(jobTable.id)
  );

  return res.status(200).json({
    jobs: jobs,
    totalCount: Number(totalCount),
    currentPage: parsedPage,
    limit: parsedLimit,
  });
};

export const getRecruiterJobs = async (req: Request, res: Response) => {
  let {
    location,
    jobLevel,
    category,
    jobType,
    experience,
    salary,
    keywords,
    vacancy,
    page,
    limit,
  } = req.query;

  const { id } = req.params;

  if (!id) throw new BadRequestError("Id not found!");

  console.log("hello from rec jobs");

  const conditions = [];

  conditions.push(eq(jobTable.createdBy, id));
  // Convert string query params to numbers where expected
  const parsedSalary =
    typeof salary === "string" ? parseInt(salary) : undefined;

  const parsedVacancy =
    typeof vacancy === "string" ? parseInt(vacancy) : undefined;

  // Pagination parameters
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : 10;
  const offset = (parsedPage - 1) * parsedLimit;

  if (parsedVacancy !== undefined && !isNaN(parsedVacancy)) {
    conditions.push(gte(jobTable.vacancy, parsedVacancy));
  }

  // if (parsedSalary !== undefined && !isNaN(parsedSalary)) {
  //   conditions.push(gte(jobTable.salary, parsedSalary));
  // }

  // if (parsedMaxPrice !== undefined && !isNaN(parsedMaxPrice)) {
  //   conditions.push(lte(jobTable.price, parsedMaxPrice));
  // }

  // if (typeof industry === "string" && industry.length > 0) {
  //   conditions.push(eq(jobTable.jobType, deliveryTime as string));
  // }

  if (typeof category === "string" && category.length > 0) {
    conditions.push(eq(jobTable.category, category));
  }

  if (typeof jobType === "string" && jobType.length > 0) {
    conditions.push(eq(jobTable.jobType, jobType));
  }

  if (typeof jobLevel === "string" && jobLevel.length > 0) {
    conditions.push(eq(jobTable.jobLevel, jobLevel));
  }

  if (typeof location === "string" && location.length > 0) {
    conditions.push(eq(jobTable.location, location));
  }

  if (typeof experience === "string" && experience.length > 0) {
    conditions.push(eq(jobTable.experience, experience));
  }

  if (typeof keywords === "string" && keywords.length > 0) {
    conditions.push(
      or(
        ilike(jobTable.category, `%${keywords}%`),
        ilike(jobTable.title, `%${keywords}%`),
        ilike(jobTable.description, `%${keywords}%`)
      )
    );
  }

  // Define the 'where' clause once
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 1. Get total count of matching jobs (applying the same 'where' clause)
  const [totalCountResult] = await handleAsync(
    db
      .select({ count: count(jobTable.id) })
      .from(jobTable)
      .where(whereClause) // Apply the 'where' clause here
  );

  const totalCount = totalCountResult?.count || 0;

  // 2. Get paginated jobs (applying the same 'where' clause, then limit and offset)
  const jobs = await handleAsync(
    db
      .select()
      .from(jobTable)
      .where(whereClause)
      .limit(parsedLimit)
      .offset(offset)
      .orderBy(jobTable.id)
  );

  return res.status(200).json({
    jobs: jobs,
    totalCount: Number(totalCount),
    currentPage: parsedPage,
    limit: parsedLimit,
  });
};

export const getSimilarJobs = async (req: Request, res: Response) => {
  let {
    location,
    jobLevel,
    jobType,
    experience,
    salary,
    keywords,
    vacancy,
    page,
    limit,
  } = req.query;

  const { category } = req.params;

  if (!category) throw new BadRequestError("Category is not found!");

  const conditions = [];

  conditions.push(eq(jobTable.category, category));
  // Convert string query params to numbers where expected
  const parsedSalary =
    typeof salary === "string" ? parseInt(salary) : undefined;

  const parsedVacancy =
    typeof vacancy === "string" ? parseInt(vacancy) : undefined;

  // Pagination parameters
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : 10;
  const offset = (parsedPage - 1) * parsedLimit;

  if (parsedVacancy !== undefined && !isNaN(parsedVacancy)) {
    conditions.push(gte(jobTable.vacancy, parsedVacancy));
  }

  // if (parsedSalary !== undefined && !isNaN(parsedSalary)) {
  //   conditions.push(gte(jobTable.salary, parsedSalary));
  // }

  // if (parsedMaxPrice !== undefined && !isNaN(parsedMaxPrice)) {
  //   conditions.push(lte(jobTable.price, parsedMaxPrice));
  // }

  // if (typeof industry === "string" && industry.length > 0) {
  //   conditions.push(eq(jobTable.jobType, deliveryTime as string));
  // }

  if (typeof jobType === "string" && jobType.length > 0) {
    conditions.push(eq(jobTable.jobType, jobType));
  }

  if (typeof jobLevel === "string" && jobLevel.length > 0) {
    conditions.push(eq(jobTable.jobLevel, jobLevel));
  }

  if (typeof location === "string" && location.length > 0) {
    conditions.push(eq(jobTable.location, location));
  }

  if (typeof experience === "string" && experience.length > 0) {
    conditions.push(eq(jobTable.experience, experience));
  }

  if (typeof keywords === "string" && keywords.length > 0) {
    conditions.push(
      or(
        ilike(jobTable.category, `%${keywords}%`),
        ilike(jobTable.title, `%${keywords}%`),
        ilike(jobTable.description, `%${keywords}%`)
      )
    );
  }

  // Define the 'where' clause once
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 1. Get total count of matching jobs (applying the same 'where' clause)
  const [totalCountResult] = await handleAsync(
    db
      .select({ count: count(jobTable.id) })
      .from(jobTable)
      .where(whereClause) // Apply the 'where' clause here
  );

  const totalCount = totalCountResult?.count || 0;

  // 2. Get paginated jobs (applying the same 'where' clause, then limit and offset)
  const jobs = await handleAsync(
    db
      .select()
      .from(jobTable)
      .where(whereClause)
      .limit(parsedLimit)
      .offset(offset)
      .orderBy(jobTable.id)
  );

  return res.status(200).json({
    jobs: jobs,
    totalCount: Number(totalCount),
    currentPage: parsedPage,
    limit: parsedLimit,
  });
};

// import { Job } from "../models/job.model.js";

// export const postJob = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       requirements,
//       salary,
//       location,
//       jobType,
//       experience,
//       position,
//       companyId,
//     } = req.body;
//     const userId = req.id;

//     if (
//       !title ||
//       !description ||
//       !requirements ||
//       !salary ||
//       !location ||
//       !jobType ||
//       !experience ||
//       !position ||
//       !companyId
//     ) {
//       return res.status(400).json({
//         message: "Somethin is missing.",
//         success: false,
//       });
//     }
//     const job = await Job.create({
//       title,
//       description,
//       requirements: requirements.split(","),
//       salary: Number(salary),
//       location,
//       jobType,
//       experienceLevel: experience,
//       position,
//       company: companyId,
//       created_by: userId,
//     });
//     return res.status(201).json({
//       message: "New job created successfully.",
//       job,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // for students or applicants

// export const getAllJobs = async (req, res) => {
//   try {
//     const keyword = req.query.keyword || "";
//     const query = {
//       $or: [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } },
//       ],
//     };
//     const jobs = await Job.find(query)
//       .populate({
//         path: "company",
//       })
//       .sort({ createdAt: -1 });
//     if (!jobs) {
//       return res.status(404).json({
//         message: "Jobs not found.",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       jobs,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getJobById = async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const job = await Job.findById(jobId).populate({
//       path: "applications",
//     });

//     if (!job) {
//       return res.status(404).json({
//         message: "Jobs not found.",
//         success: false,
//       });
//     }
//     return res.status(200).json({ job, success: true });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // how many jobs admin created till now
// export const getAdminJobs = async (req, res) => {
//   try {
//     const adminId = req.id;
//     const jobs = await Job.find({ created_by: adminId }).populate({
//       path: "company",
//       createdAt: -1,
//     });
//     if (!jobs) {
//       return res.status(404).json({
//         message: "Jobs not found.",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       jobs,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
