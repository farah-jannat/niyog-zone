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
    <div
      className={`flex flex-col col-span-12 items-start  gap-2 ${className}`}
    >
      <label
        htmlFor={label}
        className="text-[#03050F] font-lato text-[16px] font-normal tracking-[-0.64]"
      >
        {label}
      </label>

      <input
        id={label}
        type={type}
        {...register}
        placeholder={placeholder}
        className={`bg-[#FBFBFE] font-normal text-[16px] tracking-[-0.64] placeholder:text-[#68696F] outline-none border border-black/20 w-full rounded-xl p-5`}
      />
    </div>
  );
};

export default FilterInput;
