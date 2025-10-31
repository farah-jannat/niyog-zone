import AdminJobsTable from "./components/admin/AdminJobsTable";
import CompaniesTable from "./components/admin/CompaniesTable";

export const profileMenus = [
  {
    title: "Companies",
    component: CompaniesTable,
  },

  {
    title: "Jobs",
    component: AdminJobsTable,
  },
];

export const jobMenus = [
  {
    title: "Description",
  },
  {
    title: "Company",
  },
];

export const recruiterMenus = [
  {
    title: "Job",
  },
  {
    title: "Company",
  },
];

const populerSearches = ["Designer", "Mid", "Developer", "Senior Developer"];

export const CategoryFilter = {
  name: "category",
  categories: [
    "Software",
    "Healthcare and Wellness",
    "Finance and Business",
    "Manufacturing and Engineering",
    "Education and Training",
    "Construction and Infrastructure",
    "Arts, Design, and Media",
    "Hospitality and Tourism",
  ],
};
export const JobTypeFilter = {
  name: "job type",
  types: [
    "Full time",
    "Part time",
    "Onsite",
    "Remote",
    "Hybrid",
    "Seasonal",
    "Contract",
  ],
};

export const JobLabelFilter = {
  name: "job label",
  labels: ["Junior", "Mid-Level", "Senior", "Lead-Principal", "Manager"],
};
export const ExperienceFilter = {
  name: "experience",
  experiences: ["1 year", "3 year", "4 year", "5 year", "10 year"],
};
export const SalaryFilter = {
  name: "salary",
  salarys: ["30K", "50K", "60K", "100K", "250K"],
};

export const jobLimit = "12";

// export const categories = [
//   "Software",
//   "Healthcare and Wellness ",
//   "Finance and Business",
//   "Manufacturing and Engineering",
//   "Education and Training",
//   "Construction and Infrastructure",
//   "Arts, Design, and Media",
//   "Hospitality and Tourism",
// ];

// export const jobTypes = [
//   "Full time",
//   "Part time",
//   "Onsite",
//   "Remote",
//   "Hybrid",
//   "Seasonal",
//   "Contract",
// ];

// export const jobLabels = [
//   "Junior",
//   "Mid-Level",
//   "Senior",
//   "Lead-Principal",
//   "Manager",
// ];

// export const jobExperiences = [
//   "1 year",
//   "3 year",
//   "4 year",
//   "5 year",
//   "10 year",
// ];
// export const jobSalaries = ["30K", "50K", "60K", "100K", "250K"];

export const howItWorkSteps = [
  {
    heading: "Create a Gig",
    subheading:
      "Sign up for free, set up your Gig, and offer your work to our global audience.",
  },
  {
    heading: "Deliver great work",
    subheading:
      "Get notified when you get an order and use our system to discuss details with customers.",
  },
  {
    heading: "Get paid",
    subheading:
      "Get paid on time, every time. Payment is available for withdrawal as soon as it clears.",
  },
  {
    heading: "Happy Client !",
    subheading:
      "Get paid on time, every time. Payment is available for withdrawal as soon as it clears.",
  },
];

export const footerData = [
  {
    heading: "RESOURCES",
    links: ["eBooks", "Tutorial", "Blog", "Playlist"],
  },

  {
    heading: "COMPANY",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    heading: "HELP",
    links: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    heading: "FAQ",
    links: ["Account", "Deliveries", "Orders", "Payments"],
  },
];

// export const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
export const jobTypesSelect = [
  { label: "Full-time", value: "Full-time" },
  { label: "Part-time", value: "Part-time" },
  { label: "Contract", value: "Contract" },
  { label: "Internship", value: "Internship" },
];
// export const jobLevels = ["Junior", "Senior", "Mid"];

export const jobLevels = [
  { label: "Junior", value: "Junior" },
  { label: "Senior", value: "Senior" },
  { label: "Mid", value: "Mid" },
];

// export const experiences = ["2", "3", "3", "4", "5"];
export const jobExperiences = [
  { label: "1+ Years", value: "1" },
  { label: "2+ Years", value: "2" },
  { label: "3+ Years", value: "3" },
  { label: "4+ Years", value: "4" },
  { label: "5+ Years", value: "5" },
  { label: "6+ Years", value: "6" },
];

// export const jobSalaries = ["$500/hr", "$1000/hr", "$1500/hr", "$2000/hr"];

export const jobSalaries = [
  { label: "$500/hr", value: 500 },
  { label: "$1000/hr", value: 1000 },
  { label: "$1500/hr", value: 1500 },
  { label: "$2000/hr", value: 2000 },
];

export const jobCategories = [
  { label: "Software", value: "Software" },
  { label: "Healthcare and Wellness ", value: "Healthcare and Wellness " },
  { label: "Finance and Business", value: "Finance and Business" },
  {
    label: "Manufacturing and Engineering",
    value: "Manufacturing and Engineering",
  },
  { label: "Education and Training", value: "Education and Training" },
  {
    label: "Construction and Infrastructure",
    value: "Construction and Infrastructure",
  },
  { label: "Arts, Design, and Media", value: "Arts, Design, and Media" },
  { label: "Hospitality and Tourism", value: "Hospitality and Tourism" },
];
