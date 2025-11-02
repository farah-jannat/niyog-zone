"use client";
import { createJobForm } from "@/features/job/default-form-values/job-create.form";
import {
  insertJobSchema,
  InsertJobType,
} from "@/features/job/schemas/create-job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateJob = () => {
  // ** --- form ---
  const form = useForm<InsertJobType>({
    // resolver: zodResolver(insertJobSchema) as Resolver<InsertJobType>,
    resolver: zodResolver(insertJobSchema),
    defaultValues: createJobForm(),
    // mode: "onChange",
    // mode: "onSubmit",
  });

//   useEffect(() => {
//     form.reset(createJobForm());
//   }, [form]);




  return <div>This is create job</div>;
};

export default CreateJob;
