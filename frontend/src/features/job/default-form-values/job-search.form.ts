import { JobSearchFormValues } from "@/features/job/schemas/search.schema";

const jobSearchForm = (): JobSearchFormValues => {
  const form: JobSearchFormValues = {
    category: "",
    jobType: "",
    jobLevel: "",
    experience: "",
    salary: "",
    keywords: "", // Assuming 'keywords' maps to the 'title' field in your schema
  };

  return form;
};

export default jobSearchForm;
