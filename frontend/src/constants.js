import AdminJobsTable from "./components/admin/AdminJobsTable";
import CompaniesTable from "./components/admin/CompaniesTable";

export const profileMenus = [
  {
    title: "Companies",
    component:CompaniesTable
  },

  {
    title: "Jobs",
    component: AdminJobsTable
  },
];

export const jobMenus = [
  {
    title:"Description"
  },
  {
    title:"Company"
  }
]