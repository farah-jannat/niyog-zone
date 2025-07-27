import { gql } from "@apollo/client";

export const GET_JOB_bY_ID = gql`
  query GetJobById($jobId: ID!) {
    getJobById(jobId: $jobId) {
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
      # created_by {
      #   fullName
      # }
      applications {
        applicant {
          fullName
          id
        }
      }
      createdAt
      updatedAt
    }
  }
`;
