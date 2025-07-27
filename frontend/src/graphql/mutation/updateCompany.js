import { gql } from "@apollo/client";

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $name: String
    $description: String
    $website: String
    $location: String
    $logo: String
    $companyId: String!
  ) {
    updateCompany(
      updateCompanyInput: {
        name: $name
        description: $description
        website: $website
        location: $location
        logo: $logo
        companyId: $companyId
      }
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
