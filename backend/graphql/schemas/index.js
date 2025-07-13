import applicationSchema from "./application-schema.js";
import companySchema from "./company-schema.js";
import jobSchema from "./job-schema.js";
import userSchema from "./user-schema.js";

const typeDefs = `#graphql
  ${userSchema}
  ${jobSchema}
  ${applicationSchema}
  ${companySchema}

  type Query {
    getAllJobs: [Job]!
  }
`;

export default typeDefs;
