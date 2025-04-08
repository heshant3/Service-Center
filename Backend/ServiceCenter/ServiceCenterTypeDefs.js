const { gql } = require("apollo-server");

const serviceCenterTypeDefs = gql`
  type ServiceCenterData {
    id: ID!
    name: String!
    mobile: String!
    address: String!
    service_center_id: Int
    email: String
    password: String
    about: String
    businessHours: String
  }

  type ServiceType {
    id: ID!
    service_center_id: Int!
    basic_price: Int!
    half_service_price: Int!
    full_service_price: Int!
    comprehensive_price: Int!
  }

  type Query {
    getServiceCentersData: [ServiceCenterData]
    getServiceCenterDataById(id: ID!): ServiceCenterData
    getServiceCenterDataByServiceCenterId(
      service_center_id: Int
    ): ServiceCenterData
    getServiceTypesByServiceCenterId(service_center_id: Int!): ServiceType
  }

  type Mutation {
    addServiceCenterData(
      name: String!
      mobile: String!
      address: String!
      service_center_id: Int
      email: String
      password: String
      about: String
      businessHours: String
    ): ServiceCenterData
    updateServiceCenterData(
      service_center_id: Int!
      name: String
      mobile: String
      address: String
      email: String
      password: String
      about: String
      businessHours: String
    ): ServiceCenterData
    deleteServiceCenterData(id: ID!): String
    addServiceType(
      service_center_id: Int!
      basic_price: Int!
      half_service_price: Int!
      full_service_price: Int!
      comprehensive_price: Int!
    ): ServiceType
    updateServiceType(
      service_center_id: Int!
      basic_price: Int
      half_service_price: Int
      full_service_price: Int
      comprehensive_price: Int
    ): ServiceType
    deleteServiceType(id: ID!): String
  }
`;

module.exports = serviceCenterTypeDefs;
