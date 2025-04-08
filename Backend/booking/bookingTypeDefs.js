const { gql } = require("apollo-server");

const bookingTypeDefs = gql`
  type Booking {
    id: ID!
    customerId: ID!
    serviceCenterId: ID!
    serviceType: String!
    date: String!
    time: String!
    price: Float!
    status: String!
  }

  type Query {
    getBookings: [Booking]
    getBookingById(id: ID!): Booking
    getBookingsByServiceCenterId(serviceCenterId: ID!): [Booking]
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
