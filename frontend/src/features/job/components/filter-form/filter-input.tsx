"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  register: UseFormRegisterReturn;
}

const FilterInput = (props: Props) => {
  const { label, className, placeholder, type, register } = props;

  return (
    <input
      id={label}
      type={type}
      {...register}
      placeholder={placeholder}
      className={`bg-[#F5F6FD] font-normal text-[16px] tracking-[-0.64] placeholder:text-[#68696F] outline-none w-fulll rounded-[4px] px-3.5 py-3 border-none`}
    />
  );
};

export default FilterInput;
