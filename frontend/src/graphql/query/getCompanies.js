import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query GetCompanies($userId: ID!) {
    getCompanies(userId: $userId) {
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
