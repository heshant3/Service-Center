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

  type Query {
    getCustomersData: [CustomerData]
    getCustomerDataById(id: ID!): CustomerData
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
