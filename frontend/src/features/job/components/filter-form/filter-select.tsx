"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobSearchFormValues } from "@/features/job/schemas/search.schema";
import { Fragment } from "react";
import { Control, Controller } from "react-hook-form";

// Define a type for the option object
type OptionObject = {
  label: string;
  value: string | number; // Use string | number to cover both use cases
};

interface Props {
  name: keyof JobSearchFormValues;
  label: string;
  // Change the options type to an array of OptionObject
  options: OptionObject[];
  placeholder: string;
  className?: string;
  // Update control type to allow for both string and number values,
  // as the form value will store the 'value' from the option object.
  control: Control<JobSearchFormValues>;
}

const FilterSelect: React.FC<Props> = (props: Props) => {
  const { label, options, name, placeholder, className = "", control } = props;

  return (
    <div className={`${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value ? String(field.value) : ""}
            // value={field.value || ""}
          >
            <SelectTrigger className="w-full h-auto! px-3.5 py-3 shadow-none outline-none! bg-[#F5F6FD] text-[16px] !ring-0! ring-offset-0! focus:ring-0! focus:ring-offset-0! focus:outline-none rounded-[4px] border-none text-[#35373F]! data-[state=open]:text-blue-500">
              <SelectValue
                placeholder={placeholder}
                className="focus:outline-none outline-none text-[16px]"
              />
            </SelectTrigger>
            <SelectContent className="focus:outline-none outline-none text-[16px]">
              {options.map((item, idx) => (
                <Fragment key={idx}>
                  <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 focus:outline-none outline-none">
                    {/* <SelectItem value={String(item.value)}> */}
                    <SelectItem value={String(item.value)}>
                      {item.label}
                    </SelectItem>
                  </div>
                </Fragment>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default FilterSelect;
// return (
//   <div
//     className={`flex flex-col items-start w-full max-w-full gap-2 ${className}`}
//   >
//     <label
//       htmlFor={id}
//       className="text-[#03050F] font-lato text-[16px] font-normal tracking-[0.64]]"
//     >
//       {label}
//     </label>

//     <div className="relative w-full">
//       <select
//         id={id}
//         name={id}
//         value={value}
//         onChange={handleFilterChange}
//         className="bg-[#FBFBFE] p-5 rounded-xl border border-black/20 text-[16px] text-[#68696F] appearance-none w-full focus:outline-none  cursor-pointer transition duration-150 ease-in-out"
//       >
//         <option value="">{placeholder}</option>

//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>

//       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
//         <svg
//           className="h-4 w-4"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//     </div>
//   </div>
// );
