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

export const applicationMutations = {
  async applyJob(_, { applyJobInput }, context) {
    const { userId, jobId } = applyJobInput;
    try {
      if (!jobId) throw new Error("Job id is required.");

      // check if the user has already applied for the job
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: userId,
      });

      if (existingApplication)
        throw new Error("You have already applied for this jobs");

      // check if the jobs exists
      const job = await Job.findById(jobId);
      if (!job) throw new Error("job not found");

      // create a new application
      const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
      });
      console.log("new aplicaton", newApplication);
      job.applications.push(newApplication._id);
      await job.save();
      return newApplication;
    } catch (error) {
      console.error("Error in applyjob resolver:", error);
      throw new Error("Failed to apply to job.");
    }
  },
  async updateStatus(_, { updateStatusInput }, context) {
    try {
      const { status, applicationId } = updateStatusInput;

      if (!status) throw new Error("status is required");

      // find the application by applicantion id
      const application = await Application.findOne({ _id: applicationId });
      if (!application) throw new Error("status is required");

      // update the status
      application.status = status.toLowerCase();
      await application.save();
      return application;
    } catch (error) {
      console.error("Error in update resolver:", error);
      throw new Error("Failed to update application status.");
    }
  },
};
