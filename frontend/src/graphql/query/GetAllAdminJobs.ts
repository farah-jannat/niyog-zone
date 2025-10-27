import { gql } from "@apollo/client";

export const GET_ALL_ADMIN_JOBS = gql`
  query GetAdminJobs($adminId: ID!) {
    getAdminJobs(adminId: $adminId) {
      id
      title
      description
      requirements
      salary
      experienceLevel
      location
      jobType
      position
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

      applications {
        applicant {
          fullName
        }
      }
      createdAt
      updatedAt
    }
  }
`;
