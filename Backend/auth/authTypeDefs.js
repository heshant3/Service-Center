const { gql } = require("apollo-server");

const typeDefs = gql`
  type Customer {
    id: ID!
    email: String!
    name: String
    mobile: String
    address: String
  }

  type Admin {
    id: ID!
    email: String!
    name: String
    mobile: String
    address: String
  }

  type ServiceCenter {
    id: ID!
    email: String!
  }

  type Query {
    me: Customer
  }

  type Mutation {
    registerCustomer(email: String!, password: String!): Customer!
    loginCustomer(email: String!, password: String!): Customer!
    registerAdmin(email: String!, password: String!): Admin!
    loginAdmin(email: String!, password: String!): Admin!
    registerServiceCenter(email: String!, password: String!): ServiceCenter!
    loginServiceCenter(email: String!, password: String!): ServiceCenter!

    # Customer CRUD operations
    addCustomer(
      name: String!
      mobile: String!
      address: String!
      email: String!
      password: String!
    ): Customer!
    updateCustomer(
      id: ID!
      name: String
      mobile: String
      address: String
      email: String
    ): Customer!
    deleteCustomer(id: ID!): String!

    # Admin CRUD operations
    addAdmin(
      name: String!
      mobile: String!
      address: String!
      email: String!
      password: String!
    ): Admin!
    updateAdmin(
      id: ID!
      name: String
      mobile: String
      address: String
      email: String
    ): Admin!
    deleteAdmin(id: ID!): String!
  }
`;

module.exports = typeDefs;
