const { gql } = require("apollo-server");

const customerTypeDefs = gql`
  type CustomerData {
    id: ID!
    name: String!
    mobile: String!
    address: String!
    customer_id: Int
    email: String
    password: String
  }

  type CustomerDetails {
    id: ID!
    name: String!
    mobile: String!
    address: String!
    email: String
  }

  type CustomerDetailsResponse {
    totalCount: Int!
    customerDetails: [CustomerDetails]
  }

  type Query {
    getCustomersData: [CustomerData]
    getCustomerDataById(id: ID!): CustomerData
    getAllCustomerDetails: CustomerDetailsResponse
  }

  type Mutation {
    addCustomerData(
      name: String!
      mobile: String!
      address: String!
      customer_id: Int
    ): CustomerData
    updateCustomerData(
      id: ID!
      name: String
      mobile: String
      address: String
      customer_id: Int
      email: String
      password: String
    ): CustomerData
    deleteCustomerData(id: ID!): String
  }
`;

module.exports = customerTypeDefs;
