import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation Update($updateInput: updateInput) {
    update(updateInput: $updateInput) {
      id
      fullName
      email
      phoneNumber

      password
      Profile {
        profilePhoto
        resume
        bio
        skills
        # resumeOriginalName
      }
      role
    }
  }
`;
