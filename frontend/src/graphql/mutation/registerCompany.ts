import { gql } from "@apollo/client";

export const REGISTER_COMPANY = gql`
  mutation RegisterCompany($userId: String!, $companyName: String!) {
    registerCompany(
      companyRegisterInput: { userId: $userId, companyName: $companyName }
    ) {
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
`;
