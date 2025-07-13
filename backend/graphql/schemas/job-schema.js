const jobSchema = `
type Job {
    id: ID!
    title: String!
    description: String!
    requirements: [String]
    salary: Int!
    experienceLevel: Int!
    location: String!
    jobType: String!
    position: Int!
    company : Company
    created_by: User
    applications: Application
    createdAt: String!
    updatedAt: String!
}

`;

export default jobSchema;
