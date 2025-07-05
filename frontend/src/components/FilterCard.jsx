import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown } from "lucide-react";

const fitlerData = [
  {
    fitlerType: "Industry",
    array: ["All", "Software", "Finance", "Marketing", "Management", "Design"],
  },
  {
    fitlerType: "Popular Keyward",
    array: ["All", "Frontend Developer", "Developer", "Software"],
  },
  {
    fitlerType: "Salary",
    array: ["All", "0-20k", "20k-40k", "40k-80k", "80k-100k", "100k-200k"],
  },
  {
    fitlerType: "Positon",
    array: ["All", "Senior", "Junior", "Fresher", "Intern", "MidLevel"],
  },
  {
    fitlerType: "Onsite/Remote",
    array: ["All", "On-site", "Remote", "Hybrid"],
  },
  {
    fitlerType: "Job Type",
    array: ["All", "Full Time", "Part-Time", "Hybrid"],
  },
];
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    console.log(selectedValue);
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 border-b pb-2">
        <h2 className="text-Black font-semibold">Advanced Filter</h2>
        <span className="text-sm text-gray-500">Reset</span>
      </div>
      {/* <h1 className="font-bold text-lg">Filter Jobs</h1> */}
      <div className="flex items-center justify-center gap-2 border border-gray-150 rounded-md px-3 py-2 mt-5 text-gray-500">
        <button className="text-sm font-semibold  flex items-center gap-3">
          Location <ChevronDown size={18} />
        </button>
      </div>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div>
            <h1 className="font-semibold text-Black">{data.fitlerType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="rounded-md border-gray-500 "
                    />

                    <Label className="text-sm font-normal text-gray-500">
                      {item}
                    </Label>
                  </div>
                  <span className="bg-light_purple rounded-md py-1 px-1 font-bold text-blue-900 text-[10px]">
                    29
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
