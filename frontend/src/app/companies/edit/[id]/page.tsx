
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
import { jobCategories } from "@/constants";
import { editCompany } from "@/features/company/api/mutations.api";
import { createCompanyForm } from "@/features/company/default-form-values/company-create.form";
import { editCompanyForm } from "@/features/company/default-form-values/company-edit.form";
import useCreateCompanyMutation from "@/features/company/mutations/use-create-company.mutation";
import useEditCompanyMutation from "@/features/company/mutations/use-edit-company.mutation";
import { useCompanyQuery } from "@/features/company/queries/use-company.query";
import {
  insertCompanySchema,
  InsertCompanyType,
} from "@/features/company/schemas/create-company.schema";
import { editCompanySchema, EditCompanyType } from "@/features/company/schemas/edit-company.schema";
import { useBrowser } from "@/hooks/use-browser.hook";
import { useAuthStore } from "@/store/use-auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { ChangeEvent, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";

const EditCompany = () => {

    const {id} = useParams<{id:string}>()
  // ** --- store ---
  const { authUser } = useAuthStore();
  

//   ** ---- Query ---

    const {data:company} = useCompanyQuery(id)
    console.log("company is", company)

  // ** --- form ---
//   const form = useForm<InsertCompanyType>({
//     resolver: zodResolver(insertCompanySchema),
//     defaultValues: createCompanyForm(),
//   });
  
  const form = useForm<EditCompanyType>({
    resolver:  zodResolver(editCompanySchema) ,
    defaultValues: editCompanyForm(company)
  })


  const imagePreview = form.watch("logo");

//   useEffect(() => {
//     form.reset(createCompanyForm(authUser?.id));
//   }, [form, authUser]);

useEffect(()=>{
    if(company) form.reset(editCompanyForm(company))
},[form, company])
  

  // ** --- mutations ---
//   const { mutate: createCompany, isPending } = useCreateCompanyMutation({
//     reset: form.reset,
//     setError: form.setError,
//   });

const {mutate:editCompany, isPending:isCompanyUpdating} = useEditCompanyMutation({
    reset: form.reset,
    setError: form.setError,
})

  //   ** --- browser ---
  const isBrowser = useBrowser();
  if (!isBrowser) return;

  console.log(form.formState.errors);

  return (
    <Container className="py-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => editCompany(data))}
        //   onSubmit={form.handleSubmit((data) =>
        //     console.log("submitted data is ", data)
        //   )}
          className="grid grid-cols-12 gap-6"
        >
          <div className="col-span-12 xl:col-span-6">
            <Card className="px-6 shadow-lg h-full flex flex-col justify-center">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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

              {/* Description Field */}
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
              {/* Basic Title Field */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.google.com/"
                        {...field}
                        className="p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px]  rounded-[8px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Basic Description Field */}
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
            </Card>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <Card className="px-6 shadow-lg h-full">
              {/* Category Field */}
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
              {/* image field */}
              <FormField
                control={form.control}
                name="logo"
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

              <Button
                disabled={isCompanyUpdating}
                type="submit"
                className="cursor-pointer  bg-[#287992] text-white py-5 w-max"
              >
                {isCompanyUpdating ? "Updating..." : "submit"}
              </Button>
            </Card>
          </div>
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
        form.setValue("logo", base64String); // Set the base64 string to the form field
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("logo", "");
    }
  }

  function handleClearImage() {
    form.setValue("logo", "");

    const fileInput = document.getElementById(
      "cover-image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }
};

export default EditCompany;
