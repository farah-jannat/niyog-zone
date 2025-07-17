import { gql } from "@apollo/client";

export const GET_COMPANY_BY_ID = gql`
  query GetCompanyById($companyId: ID!) {
    getCompanyById(companyId: $companyId) {
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
