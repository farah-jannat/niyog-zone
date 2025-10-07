import { gql } from "@apollo/client";

export const GET_APPLIED_JOBS = gql`
  query GetAppliedJobs($userId: ID!) {
    getAppliedJobs(userId: $userId) {
      id
      job {
        title
        company {
          name
        }
      }
      applicant {
        fullName
      }

      website
      status
      createdAt
      updatedAt
    }
  }
`;
