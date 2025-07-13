const applicationSchema = `
type Application{
    id: ID!
    job: Job!
    applicant: User!
    website:String
    status: String
    createdAt: String!
    updatedAt: String!
}

`;

export default applicationSchema;
