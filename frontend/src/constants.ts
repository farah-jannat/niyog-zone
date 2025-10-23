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

const populerSearches = ["Designer", "Mid", "Developer", "Senior Developer"];

export const CategoryFilter = {
  name: "category",
  categories: [
    "Software",
    "Healthcare and Wellness ",
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

export const jobLimit = "10";

export const categories = [
  "Software",
  "Healthcare and Wellness ",
  "Finance and Business",
  "Manufacturing and Engineering",
  "Education and Training",
  "Construction and Infrastructure",
  "Arts, Design, and Media",
  "Hospitality and Tourism",
];

export const jobTypes = [
  "Full time",
  "Part time",
  "Onsite",
  "Remote",
  "Hybrid",
  "Seasonal",
  "Contract",
];

export const jobLabels = [
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead-Principal",
  "Manager",
];

export const jobExperiences = [
  "1 year",
  "3 year",
  "4 year",
  "5 year",
  "10 year",
];
export const jobSalaries = ["30K", "50K", "60K", "100K", "250K"];

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
