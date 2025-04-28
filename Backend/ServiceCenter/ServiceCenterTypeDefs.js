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
    businesshours: String
    imageurl: String
  }

  type ServiceType {
    id: ID!
    service_center_id: Int!
    basic_price: Int!
    half_service_price: Int!
    full_service_price: Int!
    comprehensive_price: Int!
  }

  type ServiceCenterDetails {
    id: ID!
    name: String!
    address: String!
    mobile: String!
    email: String
    about: String
    businesshours: String
    imageurl: String
    serviceTypes: [ServiceType]
    averageRating: Float # Add averageRating field
    ratingCount: Int # Add ratingCount field
  }

  type ServiceCenterDetailsResponse {
    totalCount: Int!
    serviceCenterDetails: [ServiceCenterDetails]
  }

  type Query {
    getServiceCentersData: [ServiceCenterData]
    getServiceCenterDataById(id: ID!): ServiceCenterData
    getServiceCenterDataByServiceCenterId(
      service_center_id: Int
    ): ServiceCenterData
    getServiceTypesByServiceCenterId(service_center_id: Int!): ServiceType
    getAllServiceCenterDetails: ServiceCenterDetailsResponse
    getAllServiceCenterDetailsByServiceCenterId(id: ID!): ServiceCenterDetails
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
      businesshours: String
      imageurl: String
    ): ServiceCenterData
    updateServiceCenterData(
      service_center_id: Int!
      name: String
      mobile: String
      address: String
      email: String
      password: String
      about: String
      businesshours: String
      imageurl: String
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
