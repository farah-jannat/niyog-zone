"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { jobCategories } from "@/constants";
import { createCompanyForm } from "@/features/company/default-form-values/company-create.form";
import { upsertProfileForm } from "@/features/profile/default-form-values/upsert-job.form";
import {
  upsertProfileSchema,
  UpsertProfileType,
} from "@/features/profile/schemas/upsert-profile.schema";
import { useBrowser } from "@/hooks/use-browser.hook";
import { useAuthStore } from "@/store/use-auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle, XCircle } from "lucide-react";
import { ChangeEvent, Fragment, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const CreateCompany = () => {
  // ** --- store ---
  const { authUser } = useAuthStore();

  // ** --- form ---
  const form = useForm<UpsertProfileType>({
    resolver: zodResolver(upsertProfileSchema),
    defaultValues: upsertProfileForm(),
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const imagePreview = form.watch("profilePhoto");

  useEffect(() => {
    form.reset(createCompanyForm(authUser?.id));
  }, [form, authUser]);

  const isPending = false;

  //   ** --- browser ---
  const isBrowser = useBrowser();
  if (!isBrowser) return;

  console.log(form.formState.errors);

  return (
    <Container className="py-16">
      <Form {...form}>
        <form
          //   onSubmit={form.handleSubmit((data) => createGig(data))}
          onSubmit={form.handleSubmit((data) =>
            console.log("submitted data is ", data)
          )}
          // className="grid grid-cols-12 gap-6"
        >
          <Card className="px-6 h-full flex flex-col rounded-[8px]">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Striving for progress, not perfection..."
                      {...field}
                      className="p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePhoto"
              render={() => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      id="cover-image-input"
                      className="p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                  {imagePreview && (
                    <div className="mt-4 relative w-[100px] h-[100px]">
                      {/* <p className="text-sm text-gray-500 mb-2">Image Preview:</p> */}
                      <img src={imagePreview} alt="company-logo" />
                      <Button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 h-auto w-auto cursor-pointer"
                        size="icon"
                      >
                        <XCircle className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* --- Skills --- */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold">Skills</h2>

              <div className="flex p-0 flex-col gap-y-6">
                {skillFields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-md">
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-y-6">
                        <FormField
                          control={form.control}
                          name={`skills.${index}.name`}
                          render={({ field: expField }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Javascript" {...expField} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`skills.${index}.years`}
                          render={({ field: expField }) => (
                            <FormItem>
                              <FormLabel>years</FormLabel>
                              <FormControl>
                                <Input placeholder="3+" {...expField} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="mt-[20px]">
                      <Button
                        type="button"
                        className="cursor-pointer"
                        variant="destructive"
                        // size="icon"
                        onClick={() => removeSkill(index)}
                      >
                        {/* <MinusCircle className="h-4 w-4" /> */}
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-0 flex gap-x-5">
                <Button
                  type="button"
                  className="cursor-pointer  bg-black text-white py-5"
                  onClick={() =>
                    appendSkill({
                      name: "",
                      years: "",
                    })
                  }
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                </Button>

                <Button
                  type="submit"
                  className="cursor-pointer  bg-[#287992] text-white py-5"
                >
                  Submit Form
                </Button>
              </div>
            </div>
            {/* <CardFooter className="p-0">
              <Button
                type="submit"
                className="cursor-pointer  bg-[#287992] text-white py-5 w-full"
              >
                Submit Form
              </Button>
            </CardFooter> */}
          </Card>
        </form>
      </Form>
    </Container>
  );

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue("profilePhoto", base64String); // Set the base64 string to the form field
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("profilePhoto", "");
    }
  }

  function handleClearImage() {
    form.setValue("profilePhoto", "");

    const fileInput = document.getElementById(
      "cover-image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }
};

export default CreateCompany;
