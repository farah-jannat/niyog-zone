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
    getCompanies(userId:ID!):[Company]!
    getCompanyById(companyId:ID!):Company!
    getAppliedJobs(userId:ID!):[Application]
    getApplicants(jobId:ID!):Job
  }

  type Mutation{
    register(registerInput: RegisterInput): User!
    login(loginInput:loginInput):User
    update(updateInput:updateInput):User
    postJob(postInput:postInput):Job
    registerCompany(companyRegisterInput:companyRegisterInput):Company
    applyJob(applyJobInput:applyJobInput):Application
    updateStatus(updateStatusInput:updateStatusInput):Application
    updateCompany(updateCompanyInput:updateCompanyInput):Company
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
input loginInput {
  
  email: String!
  password: String!
  role: String!
  
}
input updateInput {
  
  fullName: String
  userId: ID!
  email: String
  phoneNumber: String
  password: String
  role: String
  profilePhoto: String
  resume: String
  
}

input postInput {
    title: String!
    userId: String!
    description: String!
    requirements: [String]
    salary: Int!
    experienceLevel: Int!
    location: String!
    jobType: String!
    position: Int!
    companyId : String!
    
}
input companyRegisterInput {
    
    userId: String!
    companyName:String!
    
}
input applyJobInput {
    
    userId: String!
    jobId:String!
    
}
input updateStatusInput {
    
    status:String!
    applicationId: String!
    
}
input updateCompanyInput {
    
    
    name:String!
    description:String
    website:String
    location:String
    logo:String
    companyId :String
    
}


`;

export default typeDefs;
