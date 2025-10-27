import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!, $role: String!) {
    login(loginInput: { email: $email, password: $password, role: $role }) {
      id
      fullName
      email
      phoneNumber
      password
      role
      Profile {
        profilePhoto
        bio
        skills
        resume
        resumeOriginalName
        company {
          id
          name
          description
          website
          location
          logo
          userId
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
