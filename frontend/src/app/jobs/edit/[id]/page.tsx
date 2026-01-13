"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  jobCategories,
  jobExperiences,
  jobLevels,
  jobTypesSelect,
} from "@/constants";
import { useRecruiterCompaniesQuery } from "@/features/company/queries/use-recruiter-companies.query";
import { updateJob } from "@/features/job/api/mutations.api";
import { updateJobForm } from "@/features/job/default-form-values/job-update.form";
import useUpdateJobMutation from "@/features/job/mutations/use-update-job.mutation";
import { useJobQuery } from "@/features/job/queries/use-job.query";
import {
  updateJobSchema,
  UpdateJobType,
} from "@/features/job/schemas/update-job.schema";
import { useAuthStore } from "@/store/use-auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useFieldArray, useForm, Resolver } from "react-hook-form";

const UpdateJob = () => {
  const { id } = useParams<{ id: string }>();
  console.log("jobid", id);
  // ** --- store ---
  const { authUser } = useAuthStore();

  // ** --- queries ---

  const { data: companies } = useRecruiterCompaniesQuery({
    recruiterId: authUser?.id,
  });

  const { data: job } = useJobQuery(id);

  // console.log("companies is ", isLoading, companies);

  console.log("job is ", job);

  // ** --- form ---

  const form = useForm<UpdateJobType>({
    resolver: zodResolver(updateJobSchema) as Resolver<UpdateJobType>,
    defaultValues: updateJobForm(job),
  });

  // useEffect(() => {
  //   form.reset(createJobForm(authUser?.id));
  // }, [form, authUser]);

  useEffect(() => {
    if (job) form.reset(updateJobForm(job));

  }, [form, job]);
  const {
    fields: reqFields,
    append: appendReq,
    remove: removeReq,
  } = useFieldArray({
    control: form.control,
    // name: "requirements",
    name: "requirements",
  });

  // ** --- mutations ---
  // const { mutate: createJob, isPending: isJobCreating } = useCreateJobMutation({
  //   reset: form.reset,
  //   setError: form.setError,
  // });

  const {mutate:updateJob, isPending: isJobUpdating} = useUpdateJobMutation({
    reset: form.reset,
    setError: form.setError,
   
  })

  return (
    <Container className="py-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => updateJob(data))}
          // onSubmit={form.handleSubmit((data) =>
          //   console.log("submitted data is ", data)
          // )}
          className="grid grid-cols-12 gap-6"
        >
          <div className="col-span-12 xl:col-span-6">
            <Card className="px-6 shadow-lg h-full flex flex-col justify-center">
              {/* --- title ---*/}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Google"
                        {...field}
                        className="p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- description ---*/}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Goole is a very popular search ..."
                        className="resize-y min-h-[200px] p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* --- salary ---*/}
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="https://www.google.com/"
                        {...field}
                        className="p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- vacancy ---*/}
              <FormField
                control={form.control}
                name="vacancy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vacancy</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="https://www.google.com/"
                        {...field}
                        className="p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- location ---*/}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="San Francisco"
                        {...field}
                        className="p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- category ---*/}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      //   onValueChange={field.onChange}
                      //   value={field.value || ""}

                      onValueChange={(value) => {
                        // Check if the selected value is the "clear" option
                        if (value === "CLEAR_SELECTION") {
                          field.onChange(undefined); // Set to undefined to clear the field value
                        } else {
                          field.onChange(value); // Otherwise, set the selected value
                        }
                      }}
                      value={field.value || ""} // Set value to "" if field.value is null/undefined
                    >
                      <FormControl className="w-full p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="CLEAR_SELECTION"
                          className="text-red-500! hover:text-red-600 bg-transparent! cursor-pointer"
                        >
                          Clear Selection
                        </SelectItem>
                        {jobCategories.map((item, idx) => (
                          <Fragment key={idx}>
                            {/* <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 focus:outline-none outline-none">
                              <SelectItem value={String(item.value)}>
                                {item.label}
                              </SelectItem>
                            </div> */}

                            <SelectItem value={String(item.value)}>
                              {item.label}
                            </SelectItem>
                          </Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <Card className="px-6 shadow-lg h-full">
              {/* --- job type --- */}

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        if (value === "CLEAR_SELECTION") {
                          field.onChange(undefined);
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value || ""}
                    >
                      <FormControl className="w-full p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="CLEAR_SELECTION"
                          className="text-red-500! hover:text-red-600 bg-transparent! cursor-pointer"
                        >
                          Clear Selection
                        </SelectItem>
                        {jobTypesSelect.map((item, idx) => (
                          <Fragment key={idx}>
                            <SelectItem value={String(item.value)}>
                              {item.label}
                            </SelectItem>
                          </Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- job level --- */}

              <FormField
                control={form.control}
                name="jobLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Level</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        if (value === "CLEAR_SELECTION") {
                          field.onChange(undefined);
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value || ""}
                    >
                      <FormControl className="w-full p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="CLEAR_SELECTION"
                          className="text-red-500! hover:text-red-600 bg-transparent! cursor-pointer"
                        >
                          Clear Selection
                        </SelectItem>
                        {jobLevels.map((item, idx) => (
                          <Fragment key={idx}>
                            <SelectItem value={String(item.value)}>
                              {item.label}
                            </SelectItem>
                          </Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- job experience --- */}

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        if (value === "CLEAR_SELECTION") {
                          field.onChange(undefined);
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value || ""}
                    >
                      <FormControl className="w-full p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="CLEAR_SELECTION"
                          className="text-red-500! hover:text-red-600 bg-transparent! cursor-pointer"
                        >
                          Clear Selection
                        </SelectItem>
                        {jobExperiences.map((item, idx) => (
                          <Fragment key={idx}>
                            <SelectItem value={String(item.value)}>
                              {item.label}
                            </SelectItem>
                          </Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- job company --- */}

              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        if (value === "CLEAR_SELECTION") {
                          field.onChange(undefined);
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value || " "}
                    >
                      <FormControl className="w-full p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="CLEAR_SELECTION"
                          className="text-red-500! hover:text-red-600 bg-transparent! cursor-pointer"
                        >
                          Clear Selection
                        </SelectItem>

                        {/* {!companies && (
                          <SelectItem value="">No Company found !</SelectItem>
                        )} */}

                        {companies &&
                          companies?.map((item, idx) => (
                            <Fragment key={idx}>
                              <SelectItem value={String(item.id)}>
                                {item.name}
                              </SelectItem>
                            </Fragment>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- job requirements--- */}

              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold">Requirements</h2>

                <div className="flex p-0 flex-col gap-y-6">
                  {reqFields.map((field, index) => (
                    <div key={field.id} className="border p-4 rounded-md">
                      <FormField
                        control={form.control}
                        name={`requirements.${index}.title`}
                        render={({ field: expField }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                className="p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                                placeholder="Proficiency in SQL and relational databases."
                                {...expField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="mt-5">
                        <Button
                          type="button"
                          className="cursor-pointer"
                          variant="destructive"
                          onClick={() => removeReq(index)}
                        >
                          {/* <MinusCircle className="h-4 w-4" /> */}
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-0 flex gap-x-5 justify-between">
                  <Button
                    type="button"
                    className="cursor-pointer  bg-black text-white py-5 w-max"
                    onClick={() =>
                      appendReq({
                        title: "",
                      })
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Requirement
                  </Button>

                  <Button
                    type="submit"
                    className="cursor-pointer  bg-[#287992] text-white py-5 capitalize"
                  >
                    {isJobUpdating ? "updating..." : "submit form"}
                    
                  </Button>
                </div>
              </div>

              {/* <Button
                disabled={isPending}
                type="submit"
                className="cursor-pointer  bg-[#287992] text-white py-5 w-max"
              >
                {isPending ? "Creating..." : "Create"}
              </Button> */}
            </Card>
          </div>
        </form>
      </Form>
    </Container>
  );
};

export default UpdateJob;
