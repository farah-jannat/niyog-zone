import { gql } from "@apollo/client";

export const GET_ALL_JOBS_QUERY = gql`
  query GetAllJobs($keyword: String) {
    getAllJobs(keyword: $keyword) {
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
        name
        logo
      }
      created_by {
        fullName
      }

      createdAt
      updatedAt
    }
  }
`;
