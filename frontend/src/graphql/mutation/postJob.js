import { gql } from "@apollo/client";

export const POST_JOB = gql`
  mutation PostJob(
    $userId: String!
    $title: String!
    $description: String!
    $requirements: [String]!
    $salary: Int!
    $experienceLevel: Int!
    $location: String!
    $jobType: String!
    $position: Int!
    $companyId: String!
  ) {
    postJob(
      postInput: {
        userId: $userId
        title: $title
        description: $description
        requirements: $requirements
        salary: $salary
        experienceLevel: $experienceLevel
        location: $location
        jobType: $jobType
        position: $position
        companyId: $companyId
      }
    ) {
      id
      title
      description
      requirements
      salary
      experienceLevel
      location
      jobType
      position
      # company {
      #   id
      # }

      
    }
  }
`;

// export const CREATE_PRODUCT = gql`
//   mutation createProduct(
//     $name: String!
//     $photo: String!
//     $description: String
//     $price: String
//     $discountPrice: String
//     $qty: String
//     $unit: String
//     $stock: String
//     $category: ID
//   ) {
//     createProduct(
//       input: {
//         name: $name
//         photo: $photo
//         description: $description
//         price: $price
//         discountPrice: $discountPrice
//         qty: $qty
//         unit: $unit
//         stock: $stock
//         category: $category
//       }
//     ) {
//       errors {
//         field
//         message
//       }
//       product {
//         id
//         name
//         photo
//         description
//         stock
//         qty
//         unit
//         price
//         discountPrice
//         totalSell
//         createdAt
//         category {
//           id
//           name
//         }
//       }
//     }
//   }
// `;
