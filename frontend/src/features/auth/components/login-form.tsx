import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Controller, useForm } from "react-hook-form";
import {
  loginSchema,
  LoginSchemaType,
} from "@/features/auth/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="text-[#03050F]  xl:pr-6 text-[16px] flex flex-col gap-[42px] items-start">
      <div className="flex flex-col gap-5 items-start">
        <h2 className="text-[40px]">Sign In</h2>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#A1DD5F] underline">
            sign up
          </Link>
        </p>
      </div>

      <form
        className="w-full text-[#03050F] text-[16px] grid  gap-[34px]"
        onSubmit={handleSubmit((data) => console.log("... data is ", data))}
      >
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

export default LoginForm;
