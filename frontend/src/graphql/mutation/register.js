import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register(
    # $id: ID!
    $fullName: String!
    $email: String!
    $phoneNumber: String
    $password: String!
    $role: String!
  ) {
    register(
      registerInput: {
        # id: $id
        fullName: $fullName
        email: $email
        phoneNumber: $phoneNumber
        password: $password
        role: $role
      }
    ) {
      id
      fullName
      email
      phoneNumber
      password
      role
      Profile {
        profilePhoto
      }
      createdAt
      updatedAt
    }
  }
`;




// raf


      // onSubmit={async (values, actions) => {
      //       const response = await register({
      //         variables: {
      //           ...values,
      //           photo: values.photos[0] || '',
      //           category: parentCat.id ? parentCat.id : null,
      //         },
      //         update: (proxy, { data: { createProduct: newData } }) => {
      //           const data: any = proxy.readQuery({
      //             query: GET_PRODUCTS_BY_ADMIN,
      //           });
      //           if (newData.product) {
      //             if (data) {
      //               proxy.writeQuery({
      //                 query: GET_PRODUCTS_BY_ADMIN,
      //                 data: {
      //                   getProductsByAdmin: [
      //                     newData,
      //                     ...data.getProductsByAdmin,
      //                   ],
      //                 },
      //               });
      //             }
      //             setState({
      //               ...state,
      //               serverMessage: 'Product added successfully',
      //             });
      //             router.push('/product');
      //           }
      //         },
      //       });
      //       if (response.data?.createProduct.errors) {
      //         let errorsMap: any = toErrorMap(
      //           response.data?.createProduct.errors
      //         );
      //         if (errorsMap.hasOwnProperty('error')) {
      //           setState({
      //             ...state,
      //             error: errorsMap.error,
      //           });
      //         }
      //         actions.setErrors(errorsMap);
      //       }
      //     }}
