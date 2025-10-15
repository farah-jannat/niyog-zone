const userSchema = `
type Profile {
    bio: String
    skills: [String]
    resume: String
    resumeOriginalName: String
    profilePhoto: String
    company: [Company],
}


type User {
    id: ID!
    fullName: String
    email: String
    phoneNumber: String
    password: String!
    role: String!
    Profile: Profile
    createdAt: String!
    updatedAt: String!
}
`;

export default userSchema;
