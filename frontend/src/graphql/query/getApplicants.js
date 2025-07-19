import { gql } from "@apollo/client";

export const GET_APPLICANTS = gql`
  query GetApplicants($jobId: ID!) {
    getApplicants(jobId: $jobId) {
      id
      applications {
        applicant {
          fullName
          id
          email
          phoneNumber
          role
          Profile {
            resume
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
