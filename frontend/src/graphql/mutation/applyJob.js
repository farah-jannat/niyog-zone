import { gql } from "@apollo/client";

export const APPLY_JOB = gql`
  mutation ApplyJob($userId: String!, $jobId: String!) {
    applyJob(applyJobInput: { userId: $userId, jobId: $jobId }) {
      id
      job {
        title
        applications {
          applicant {
            id
            fullName
            email
            phoneNumber
          }
        }
      }
      website
      status
      createdAt
      updatedAt
    }
  }
`;
