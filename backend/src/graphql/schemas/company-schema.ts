const companySchema = `
type Company {
    id: ID!
    name: String
    description: String
    website:String
    location: String
    logo: String
    userId: ID!
    createdAt: String!
    updatedAt: String!
}

`;

export default companySchema;
