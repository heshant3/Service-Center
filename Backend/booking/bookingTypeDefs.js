const { gql } = require("apollo-server");

const bookingTypeDefs = gql`
  type Customer {
    name: String!
    email: String!
  }

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
    customer: Customer
    computedPart: String
  }

  type BookingList {
    bookings: [Booking]
    totalCount: Int
  }

  type Query {
    getBookings: [Booking]
    getBookingById(id: ID!): Booking
    getBookingsByServiceCenterId(serviceCenterId: ID!): [Booking]
    getBookingsByCustomerId(customerId: ID!): [Booking]
    showAllBookings: BookingList
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
    cancelBookingById(bookingId: ID!): String
    confirmBookingById(bookingId: ID!): String
    completeBookingById(bookingId: ID!): String
  }
`;

module.exports = bookingTypeDefs;
