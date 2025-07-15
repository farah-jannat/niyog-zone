import { Job } from "../../models/job.model.js";

export const jobQueries = {
  async getAllJobs(_, { keyword }, context) {
    try {
      const searchKeyword = keyword || "";

      const query = {
        $or: [
          { title: { $regex: searchKeyword, $options: "i" } },
          { description: { $regex: searchKeyword, $options: "i" } },
        ],
      };

      const jobs = await Job.find(query)
        .populate({
          path: "company",
        })
        .sort({ createdAt: -1 });

      if (!jobs) {
        return [];
      }

      return jobs;
    } catch (error) {
      console.error("Error in getAllJobs resolver:", error);
      throw new Error("Failed to fetch jobs.");
    }
  },

  async getJobById(_, { jobId }, context) {
    try {
      const job = await Job.findById(jobId).populate({
        path: "applications",
      });

      if (!job) return {};

      return job;
    } catch (error) {
      throw new Error("Failed to fetch job");
    }
  },

  async getAdminJobs(_, { adminId }, context) {
    try {
      const jobs = await Job.find({ created_by: adminId }).populate({
        path: "company",
        createdAt: -1,
      });
      if (!jobs) return [];

      return jobs;
    } catch (error) {
      console.log(error);

      throw new Error("Failed to fetch data");
    }
  },
};

export const jobMutations = {
  async postJob(_, { postInput }, context) {
    try {
      const {
        title,
        userId,
        description,
        requirements,
        salary,
        location,
        jobType,
        experienceLevel,
        position,
        companyId,
      } = postInput;
      console.log("postinpuot", title, userId, description, salary);
      if (
        !title ||
        !description ||
        !requirements ||
        !salary ||
        !location ||
        !jobType ||
        !experienceLevel ||
        !position ||
        !companyId
      )
        throw new Error("Failed to fetch data");

      const job = await Job.create({
        title,
        description,
        // requirements: requirements.split(","),
        requirements: requirements,
        salary: Number(salary),
        location,
        jobType,
        experienceLevel: experienceLevel,
        position,
        company: companyId,
        created_by: userId,
      });
      console.log("##########", job);
      return job;
    } catch (error) {
      console.log(error);

      throw new Error("Failed to create job");
    }
  },
};
