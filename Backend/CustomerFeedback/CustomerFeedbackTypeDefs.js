const { gql } = require("apollo-server");

const customerFeedbackTypeDefs = gql`
  type CustomerFeedback {
    id: ID!
    bookingId: ID # Make bookingId optional
    customerId: ID # Make customerId optional
    customerName: String # Add customerName field
    serviceCenterId: ID
    serviceType: String
    feedback: String
    rating: Float
  }

  type FeedbackStats {
    feedbacks: [CustomerFeedback]
    averageRating: Float
    ratingCount: Int
  }

  type Query {
    getFeedbacks: [CustomerFeedback]
    getFeedbackByBookingId(bookingId: ID!): CustomerFeedback
    getFeedbacksByServiceCenterId(serviceCenterId: ID!): FeedbackStats
    getFeedbacksByCustomerId(customerId: ID!): [CustomerFeedback]
  }

  type Mutation {
    addFeedback(
      bookingId: ID!
      feedback: String
      rating: Float
    ): CustomerFeedback # Updated mutation to remove customerId and serviceCenterId
  }
`;

module.exports = customerFeedbackTypeDefs;
