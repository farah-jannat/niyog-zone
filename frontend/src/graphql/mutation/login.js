import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($loginInput: loginInput) {
    login(loginInput: $loginInput) {
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
