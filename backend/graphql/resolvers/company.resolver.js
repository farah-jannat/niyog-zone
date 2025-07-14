import { Company } from "../../models/company.model.js";

export const companyQueries = {
  async getCompanies(_, { userId }, context) {
    try {
      // const userId = req.id;
      const companies = await Company.find({ userId });
      if (!companies) {
        throw new Error("no companies");
      }
      return companies;
    } catch (error) {
      console.error("Error in getCompanies resolver:", error);
      throw new Error("Failed to fetch companies.");
    }
  },

  async getCompanyById(_, { companyId }, context) {
    try {
    //   const companyId = req.params.id;
      console.log("this is companyid", companyId);
      const company = await Company.findOne({ _id: companyId });
      if (!company) throw new Error("company not found")
      return company
    } catch (error) {
      console.error("Error in getCompanyById resolver:", error);
      throw new Error("Failed to fetch company.");
    }
  },
};

export const companyMutations={

    // registerCompany 
    // updateCompany
}