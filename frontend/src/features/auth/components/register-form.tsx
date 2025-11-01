import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/features/auth/schemas/register.schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
      role: "student",
    },
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="text-[#03050F]  xl:pr-6 text-[16px] flex flex-col gap-[42px] items-start py-8">
      <div className="flex flex-col gap-5 items-start">
        <h2 className="text-[40px]">Sign Up</h2>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-[#A1DD5F] underline">
            sign in
          </Link>
        </p>
      </div>

      <form
        className="w-full text-[#03050F] text-[16px] grid gap-[34px]"
        onSubmit={handleSubmit((data) => console.log("... data is ", data))}
      >
        {/* --- Email --- */}
        <div className="grid gap-2">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                </FieldContent>
                <Input
                  className="bg-[#FBFBFE] p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px] border border-[#C9C9CB] rounded-[8px]"
                  placeholder="Enter Your Email"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* --- phone --- */}
        <div className="grid gap-2">
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                </FieldContent>
                <Input
                  className="bg-[#FBFBFE] p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px] border border-[#C9C9CB] rounded-[8px]"
                  placeholder="Enter Your Number"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* --- Password --- */}
        <div className="grid gap-2">
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                </FieldContent>
                <Input
                  className="bg-[#FBFBFE] p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px] border border-[#C9C9CB] rounded-[8px]"
                  placeholder="Enter Your Password"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* --- confirm Password --- */}
        <div className="grid gap-2">
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                </FieldContent>
                <Input
                  className="bg-[#FBFBFE] p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px] border border-[#C9C9CB] rounded-[8px]"
                  placeholder="Retype Password"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* --- full name --- */}
        <div className="grid gap-2">
          <Controller
            control={control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                </FieldContent>
                <Input
                  className="bg-[#FBFBFE] p-5 h-auto! text-[#68696F] font-lato font-normal text-[16px] border border-[#C9C9CB] rounded-[8px]"
                  placeholder="Enter Your Fullname"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* --- role --- */}
        <div className="grid gap-2">
          <Controller
            control={control}
            name="role"
            render={({ field, fieldState }) => (
              <>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  // orientation="vertical"
                  // className="flex gap-x-0"
                  className="flex"
                >
                  <Field orientation="horizontal" className="w-max!">
                    <RadioGroupItem value="student" id="student" />
                    <FieldLabel htmlFor="student" className="font-normal">
                      Student
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal" className="w-max!">
                    <RadioGroupItem value="recruiter" id="recruiter" />
                    <FieldLabel htmlFor="recruiter" className="font-normal">
                      Recruiter
                    </FieldLabel>
                  </Field>
                </RadioGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                {/* </Field> */}
              </>
            )}
          />
        </div>

        <Button
          type="submit"
          className="font-medium w-max font-lato text-[16px] px-10 py-2.5 h-auto! bg-[#287992] text-[#F5F6FD] capitalize"
        >
          {true ? "Please wait..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
