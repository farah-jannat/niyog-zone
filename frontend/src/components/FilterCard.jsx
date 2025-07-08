import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

// const fitlerData = [
//   {
//     fitlerType: "Industry",
//     array: ["All", "Software", "Finance", "Marketing", "Management", "Design"],
//   },
//   {
//     fitlerType: "Popular Keyward",
//     array: ["All", "Frontend Developer", "Developer", "Software"],
//   },
//   {
//     fitlerType: "Salary",
//     array: ["All", "0-20k", "20k-40k", "40k-80k", "80k-100k", "100k-200k"],
//   },
//   {
//     fitlerType: "Positon",
//     array: ["All", "Senior", "Junior", "Fresher", "Intern", "MidLevel"],
//   },
//   {
//     fitlerType: "Onsite/Remote",
//     array: ["All", "On-site", "Remote", "Hybrid"],
//   },
//   {
//     fitlerType: "Job Type",
//     array: ["All", "Full Time", "Part-Time", "Hybrid"],
//   },
// ];

const industry = {
  name: "Industry",
  paramKey: "industry",
  items: ["All", "Software", "Finance", "Marketing", "Management", "Design"],
};
const popularKeyward = {
  name: "Popular Keyward",
  paramKey: "keyword",
  items: ["All", "Frontend Developer", "Developer", "Software"],
};


// const salary = {
//   name: "Salary",
//   paramKey: "salary",
//   items: ["All", "30", "35k-40k", "40k-80k", "30k-100k", "100k-200k"],
// };


const salary = {
  name: "Salary",
  paramKey: "salary",
  items: [
    {
      label: "All",
      value: ""
    },
    {
      label: "30k",
      value: "30"
    },
    {
      label: "35k-40k",
      value: "35-40"
    },
    {
      label: "40k-80k",
      value: "40k-80k"
    },
    {
      label: "30k-100k",
      value: "30k-100k"
    },
    {
      label: "100k-200k",
      value: "100k-200k"
    }
  ]
};




const positon = {
  name: "Positon",
  items: ["All", "Senior", "Junior", "Fresher", "Intern", "MidLevel"],
};
const onsiteRemote = {
  name: "Onsite/Remote",
  items: ["All", "On-site", "Remote", "Hybrid"],
};
const jobType = {
  name: "Job Type",
  items: ["All", "Full Time", "Part-Time", "Hybrid"],
};

const FilterCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchParam = searchParams.get("search");
  const [selectedValue, setSelectedValue] = useState(initialSearchParam);
  const [selectedIndustry, setSelectedIndustry] = useState(() =>
    searchParams.get(industry.paramKey)
  );
  const [selectedKeyword, setSelectedKeyword] = useState();

  const [selectedSalary, setSelectedSalary] = useState(() =>
    searchParams.get(salary.paramKey)
  );
  const [selectedPosition, setselectedPosition] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const changeHandler = (value) => {
  //   setSelectedValue(value);
  //   setSearchParams((prevParams) => {
  //     prevParams.set("search", value); // Use the 'value' passed to the handler
  //     return prevParams;
  //   });
  //   navigate(`/jobs?search=${value}`);
  // };

  const handleIndustryChange = (value) => {
    console.log("value of industry", value);
    setSelectedIndustry(value);
    setSearchParams((prevParams) => {
      prevParams.set("industry", value); // Use the 'value' passed to the handler
      return prevParams;
    });
  };
  const handleKeywordChange = (value) => {
    setSelectedKeyword(value);
    setSearchParams((prevParams) => {
      prevParams.set("keyword", value); // Use the 'value' passed to the handler
      return prevParams;
    });
  };
  const handleSalaryChange = (value) => {
    console.log("value is ", value)
    setSelectedSalary(value);
    setSearchParams((prevParams) => {
      prevParams.set("salary", value); // Use the 'value' passed to the handler
      return prevParams;
    });
  };
  const handlePositionChange = (value) => {
    setselectedPosition(value);
    setSearchParams((prevParams) => {
      prevParams.set("position", value); // Use the 'value' passed to the handler
      return prevParams;
    });
  };

  useEffect(() => {
    const currentIndustry = searchParams.get(industry.paramKey);

    if (selectedIndustry !== currentIndustry) {
      setSelectedIndustry(currentIndustry);
    }
    const currentKeyword = searchParams.get(popularKeyward.paramKey);
    if (selectedKeyword !== currentKeyword) {
      setSelectedKeyword(currentKeyword);
    }
    // console.log(selectedValue);
    dispatch(setSearchedQuery(selectedValue));
    const currentSearchParam = searchParams.get("search"); // Or ''
    if (selectedValue !== currentSearchParam) {
      setSelectedValue(currentSearchParam);
    }
  }, [searchParams, selectedIndustry, selectedKeyword, selectedValue]);
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
      <RadioGroup value={selectedIndustry} onValueChange={handleIndustryChange}>
        <div>
          <h1 className="font-semibold text-Black">{industry.name}</h1>
          {industry.items.map((item, idx) => {
            // const itemId = `id${index}-${idx}`;
            return (
              <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem
                    value={item}
                    // id={itemId}
                    id={idx}
                    className="rounded-md border-gray-500 "
                  />

                  <Label className="text-sm font-normal text-gray-500 cursor-pointer">
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
      </RadioGroup>

      <RadioGroup value={selectedKeyword} onValueChange={handleKeywordChange}>
        <div>
          <h1 className="font-semibold text-Black">{popularKeyward.name}</h1>
          {popularKeyward.items.map((item, idx) => {
            // const itemId = `id${index}-${idx}`;
            return (
              <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem
                    value={item}
                    // id={itemId}
                    id={idx}
                    className="rounded-md border-gray-500 "
                  />

                  <Label className="text-sm font-normal text-gray-500 cursor-pointer">
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
      </RadioGroup>

      <RadioGroup value={selectedSalary} onValueChange={handleSalaryChange}>
        <div>
          <h1 className="font-semibold text-Black">{salary.name}</h1>
          {salary.items.map((item, idx) => {
            // const itemId = `id${index}-${idx}`;
            return (
              <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem
                    value={item.value}
                    // id={itemId}
                    id={idx}
                    className="rounded-md border-gray-500 "
                  />

                  <Label className="text-sm font-normal text-gray-500 cursor-pointer">
                    {item.label}
                  </Label>
                </div>
                <span className="bg-light_purple rounded-md py-1 px-1 font-bold text-blue-900 text-[10px]">
                  29
                </span>
              </div>
            );
          })}
        </div>
      </RadioGroup>
      <RadioGroup value={selectedPosition} onValueChange={handlePositionChange}>
        <div>
          <h1 className="font-semibold text-Black">{positon.name}</h1>
          {positon.items.map((item, idx) => {
            // const itemId = `id${index}-${idx}`;
            return (
              <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem
                    value={item}
                    // id={itemId}
                    id={idx}
                    className="rounded-md border-gray-500 "
                  />

                  <Label className="text-sm font-normal text-gray-500 cursor-pointer">
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
      </RadioGroup>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        <div>
          <h1 className="font-semibold text-Black">{onsiteRemote.name}</h1>
          {onsiteRemote.items.map((item, idx) => {
            // const itemId = `id${index}-${idx}`;
            return (
              <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem
                    value={item}
                    // id={itemId}
                    id={idx}
                    className="rounded-md border-gray-500 "
                  />

                  <Label className="text-sm font-normal text-gray-500 cursor-pointer">
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
      </RadioGroup>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        <div>
          <h1 className="font-semibold text-Black">{jobType.name}</h1>
          {jobType.items.map((item, idx) => {
            // const itemId = `id${index}-${idx}`;
            return (
              <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem
                    value={item}
                    // id={itemId}
                    id={idx}
                    className="rounded-md border-gray-500 "
                  />

                  <Label className="text-sm font-normal text-gray-500 cursor-pointer">
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
      </RadioGroup>
    </div>
  );

  function changeHandler(value) {
    setSelectedValue(value);
    setSearchParams((prevParams) => {
      prevParams.set("search", value); // Use the 'value' passed to the handler
      return prevParams;
    });
    navigate(`/jobs?search=${value}`);
  }
};

export default FilterCard;
