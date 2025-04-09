const { gql } = require("apollo-server");

const bookingTypeDefs = gql`
  type ServiceCenter {
    name: String!
    address: String!
    mobile: String!
  }

  type Booking {
    id: ID!
    customerId: ID!
    serviceCenterId: ID!
    serviceType: String!
    date: String!
    time: String!
    price: Float!
    status: String!
    serviceCenter: ServiceCenter
  }

  type Query {
    getBookings: [Booking]
    getBookingById(id: ID!): Booking
    getBookingsByServiceCenterId(serviceCenterId: ID!): [Booking]
    getBookingsByCustomerId(customerId: ID!): [Booking]
  }

  type Mutation {
    addBooking(
      customerId: ID!
      serviceCenterId: ID!
      serviceType: String!
      date: String!
      time: String!
      price: Float!
      status: String!
    ): Booking
  }
`;

module.exports = bookingTypeDefs;
