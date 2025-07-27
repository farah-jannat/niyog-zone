import { gql } from "@apollo/client";

export const UPDATE_STATUS = gql`
  mutation UpdateStatus($status: String!, $applicationId: String!) {
    updateStatus(
      updateStatusInput: { status: $status, applicationId: $applicationId }
    ) {
      id
      status
      createdAt
      updatedAt
    }
  }
`;
