import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation Update(
    $fullName: String
    $userId: ID!
    $email: String
    $bio: String
    $phoneNumber: String
    # password: String
    $role: String
    $profilePhoto: String
    $resume: String # resumeOriginalName: String
  ) {
    update(
      updateInput: {
        fullName: $fullName
        userId: $userId
        email: $email
        bio: $bio
        phoneNumber: $phoneNumber
        role: $role
        profilePhoto: $profilePhoto
        resume: $resume
      }
    ) {
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
