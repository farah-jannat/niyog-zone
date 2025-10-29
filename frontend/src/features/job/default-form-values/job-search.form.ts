import { JobSearchFormValues } from "@/features/job/schemas/search.schema";

const jobSearchForm = (obj?: JobSearchFormValues): JobSearchFormValues => {
  const inputObj = obj ?? {};

  const { category, experience, jobLevel, jobType, keywords, salary } =
    inputObj;

  const form: JobSearchFormValues = {
    category: category ?? "",
    jobType: jobType ?? "",
    jobLevel: jobLevel ?? "",
    experience: experience ?? "",
    salary: salary ?? "",
    keywords: keywords ?? "",
  };

  return form;
};

export default jobSearchForm;
