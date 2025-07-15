import { Company } from "../../models/company.model.js";
import { uploads } from "../../utils/new-cloudinary.js";

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
      if (!company) throw new Error("company not found");
      return company;
    } catch (error) {
      console.error("Error in getCompanyById resolver:", error);
      throw new Error("Failed to fetch company.");
    }
  },
};

export const companyMutations = {
  async registerCompany(_, { companyRegisterInput }, context) {
    const { companyName, userId } = companyRegisterInput;
    try {
      if (!companyName) throw new Error("company name is required");

      let company = await Company.findOne({ name: companyName });
      if (company) throw new Error("company with this name already exist");
      company = await Company.create({
        name: companyName,
        userId,
      });
      return company;
    } catch (error) {
      console.error("Error in registerCompany resolver:", error);
      throw new Error("Failed to register company.");
    }
  },

  async updateCompany(_, { updateCompanyInput }, context) {
    const { name, description, website, location, logo, companyId } =
      updateCompanyInput;
    try {
      console.log(
        "this are datas coming from frontend:",
        name,
        description,
        website,
        location
      );
      let company = await Company.findOne({ _id: companyId });
      if (!company) throw new Error("company not found");

      let uploadLogoResult = null; // Initialize to null or an empty object {}

      // Check if a new logo is provided and different from existing one
      if (logo) {
        // Check if 'logo' is provided at all
        if (company?.logo !== logo) {
          // Check if it's different from existing
          const logoPublicId = crypto.randomUUID();
          try {
            // Assuming 'uploads' returns an object like { public_id: '...', secure_url: '...' }
            uploadLogoResult = await uploads(
              logo,
              `${logoPublicId}`,
              true,
              true
            );
          } catch (error) {
            console.error("Upload error:", error);
            throw new Error("Image upload error. Try again.");
          }
        } else {
          // If logo is provided but it's the same as the existing one,
          // we should still use the existing logo's public_id (if it exists)
          uploadLogoResult = company.logo
            ? { public_id: "existing", secure_url: company.logo }
            : null; // Mimic the structure if company.logo is just a URL string
        }
      } else if (company?.logo) {
        // If no new logo is provided, but there's an existing one, use it.
        // Adapt this based on how 'company.logo' is stored (URL string vs object)
        uploadLogoResult = { public_id: "existing", secure_url: company.logo };
      }

      // Only check public_id if uploadLogoResult is an object and expected to have one
      if (
        uploadLogoResult &&
        !uploadLogoResult.public_id &&
        typeof uploadLogoResult === "object"
      ) {
        throw new Error("Image upload error. Try again. (Missing public_id)");
      }

      const updates = {};
      if (name !== undefined) updates.name = name;
      if (description !== undefined) updates.description = description;
      if (website !== undefined) updates.website = website;
      if (location !== undefined) updates.location = location;

      // Only update logo if uploadLogoResult is a valid object from upload or existing logo
      if (uploadLogoResult && uploadLogoResult.secure_url) {
        updates.logo = uploadLogoResult.secure_url;
      } else if (logo === null) {
        // Handle case where frontend explicitly sends 'null' to clear logo
        updates.logo = null;
      }

      Object.assign(company, updates);

      await company.save();
      return company; // Return the updated user object
    } catch (error) {
      console.error("Error in updateCompany resolver:", error);
      throw new Error("Failed to update company.");
    }
  },
};
