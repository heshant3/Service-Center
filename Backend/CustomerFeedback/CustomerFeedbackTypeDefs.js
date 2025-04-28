const { gql } = require("apollo-server");

const customerFeedbackTypeDefs = gql`
  type CustomerFeedback {
    id: ID!
    bookingId: ID # Make bookingId optional
    customerId: ID # Make customerId optional
    serviceCenterId: ID
    serviceType: String
    feedback: String
    rating: Float
  }

  type Query {
    getFeedbacks: [CustomerFeedback]
    getFeedbackByBookingId(bookingId: ID!): CustomerFeedback
    getFeedbacksByServiceCenterId(serviceCenterId: ID!): [CustomerFeedback]
    getFeedbacksByCustomerId(customerId: ID!): [CustomerFeedback]
  }

  type Mutation {
    addFeedback(
      bookingId: ID!
      customerId: ID
      serviceCenterId: ID
      feedback: String
      rating: Float
    ): CustomerFeedback
  }
`;

module.exports = customerFeedbackTypeDefs;
