module.exports = {
  Query: {
    getFeedbacks: async (_, __, { db }) => {
      const feedbacks = await db
        .query("SELECT * FROM customer_feedback")
        .then((res) => res.rows);
      return feedbacks;
    },
    getFeedbackByBookingId: async (_, { bookingId }, { db }) => {
      const feedback = await db
        .query("SELECT * FROM customer_feedback WHERE booking_id = $1", [
          bookingId,
        ])
        .then((res) => res.rows[0]);
      return feedback;
    },
    getFeedbacksByServiceCenterId: async (_, { serviceCenterId }, { db }) => {
      const feedbacks = await db
        .query(
          `SELECT cf.*, b.service_type, sc.id AS service_center_id, cd.name AS customer_name
           FROM customer_feedback cf
           LEFT JOIN bookings b ON cf.booking_id = b.id
           LEFT JOIN service_centers sc ON cf.service_center_id = sc.id
           LEFT JOIN customersdata cd ON cf.customer_id = cd.id
           WHERE cf.service_center_id = $1`,
          [serviceCenterId]
        )
        .then((res) => res.rows);

      // Calculate average rating and rating count
      const ratingStats = await db.query(
        `SELECT AVG(rating) AS average_rating, COUNT(rating) AS rating_count 
         FROM customer_feedback 
         WHERE service_center_id = $1`,
        [serviceCenterId]
      );

      const averageRating = parseFloat(
        (ratingStats.rows[0].average_rating || 0).toFixed(1)
      );
      const ratingCount = ratingStats.rows[0].rating_count || 0;

      return {
        feedbacks: feedbacks.map((feedback) => ({
          id: feedback.id,
          bookingId: feedback.booking_id || null,
          customerId: feedback.customer_id || null,
          customerName: feedback.customer_name || null, // Add customer name
          serviceCenterId: feedback.service_center_id || null,
          serviceType: feedback.service_type || null,
          feedback: feedback.feedback || null,
          rating: feedback.rating || null,
        })),
        averageRating, // Ensure averageRating is formatted to one decimal place
        ratingCount,
      };
    },
    getFeedbacksByCustomerId: async (_, { customerId }, { db }) => {
      const feedbacks = await db
        .query("SELECT * FROM customer_feedback WHERE customer_id = $1", [
          customerId,
        ])
        .then((res) => res.rows);
      return feedbacks;
    },
  },
  Mutation: {
    addFeedback: async (_, { bookingId, feedback, rating }, { db }) => {
      // Fetch customer_id and service_center_id from bookings table
      const booking = await db.query(
        "SELECT customer_id, service_center_id, service_type FROM bookings WHERE id = $1",
        [bookingId]
      );

      if (booking.rows.length === 0) {
        throw new Error("Booking not found");
      }

      const {
        customer_id: customerId,
        service_center_id: serviceCenterId,
        service_type: serviceType,
      } = booking.rows[0];

      // Insert feedback into customer_feedback table
      const result = await db.query(
        `INSERT INTO customer_feedback (booking_id, customer_id, service_center_id, service_type, feedback, rating) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING id, booking_id, customer_id, service_center_id, service_type, feedback, rating`,
        [bookingId, customerId, serviceCenterId, serviceType, feedback, rating]
      );

      if (result.rows.length === 0) {
        throw new Error("Failed to add feedback");
      }

      return {
        id: result.rows[0].id,
        bookingId: result.rows[0].booking_id,
        customerId: result.rows[0].customer_id,
        serviceCenterId: result.rows[0].service_center_id,
        serviceType: result.rows[0].service_type,
        feedback: result.rows[0].feedback,
        rating: result.rows[0].rating,
      };
    },
  },
};
