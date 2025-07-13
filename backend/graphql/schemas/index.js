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
    getAllJobs(keyword:String): [Job]!
    getJobById(jobId: ID!): Job
    getAdminJobs(adminId: ID!): [Job]!
  }

  type Mutation{
    register(registerInput: RegisterInput): User!
  }


# scalar Upload


input RegisterInput {
  fullName: String!
  email: String!
  phoneNumber: String!
  password: String!
  role: String!
  profilePhoto: String
  resume: String
}


`;

export default typeDefs;
