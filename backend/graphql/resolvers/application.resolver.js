import { Application } from "../../models/application.model.js";
import { Job } from "../../models/job.model.js";

export const applicationQueries = {
  async getAppliedJobs(_, { userId }, context) {
    try {
      // const userId = req.id;
      const application = await Application.find({ applicant: userId })
        .sort({ createdAt: -1 })
        .populate({
          path: "job",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "company",
            options: { sort: { createdAt: -1 } },
          },
        });
      console.log("application", application);
      if (!application) {
        throw new Error("no application");
      }
      return application;
    } catch (error) {
      console.error("Error in getAppliedjobs resolver:", error);
      throw new Error("Failed to fetch Appliedjobs.");
    }
  },
  async getApplicants(_, { jobId }, context) {
    console.log("job id is ", jobId);
    try {
      //   const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
        path: "applications",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "applicant",
        },
      });

      const applicants = job.applications.map(
        (item) => item.applicant.fullname
      );

      console.log("appliaitons are, ", applicants);

      if (!job) throw new Error("job not found");
      //   console.log("777777777777777 ", job);
      return job;
    } catch (error) {
      console.error("Error in getApplicants resolver:", error);
      throw new Error("Failed to job applicants.");
    }
  },
};
