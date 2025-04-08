const formatDate = (timestamp) =>
  new Date(parseInt(timestamp)).toISOString().split("T")[0];

module.exports = {
  Query: {
    getBookings: async (_, __, { db }) => {
      const bookings = await db
        .query("SELECT * FROM bookings")
        .then((res) => res.rows);
      return bookings.map((booking) => ({
        id: booking.id,
        customerId: booking.customer_id,
        serviceCenterId: booking.service_center_id,
        serviceType: booking.service_type,
        date: formatDate(booking.date),
        time: booking.time,
        price: booking.price,
        status: booking.status,
      }));
    },
    getBookingById: async (_, { id }, { db }) => {
      const booking = await db
        .query("SELECT * FROM bookings WHERE id = $1", [id])
        .then((res) => res.rows[0]);
      return {
        id: booking.id,
        customerId: booking.customer_id,
        serviceCenterId: booking.service_center_id,
        serviceType: booking.service_type,
        date: formatDate(booking.date),
        time: booking.time,
        price: booking.price,
        status: booking.status,
      };
    },
    getBookingsByServiceCenterId: async (_, { serviceCenterId }, { db }) => {
      const bookings = await db
        .query("SELECT * FROM bookings WHERE service_center_id = $1", [
          serviceCenterId,
        ])
        .then((res) => res.rows);
      return bookings.map((booking) => ({
        id: booking.id,
        customerId: booking.customer_id,
        serviceCenterId: booking.service_center_id,
        serviceType: booking.service_type,
        date: formatDate(booking.date),
        time: booking.time,
        price: booking.price,
        status: booking.status,
      }));
    },
  },
  Mutation: {
    addBooking: async (
      _,
      { customerId, serviceCenterId, serviceType, date, time, price, status },
      { db }
    ) => {
      const result = await db.query(
        `INSERT INTO bookings 
         (customer_id, service_center_id, service_type, date, time, price, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
        [customerId, serviceCenterId, serviceType, date, time, price, status]
      );
      const booking = result.rows[0];
      return {
        id: booking.id,
        customerId: booking.customer_id,
        serviceCenterId: booking.service_center_id,
        serviceType: booking.service_type,
        date: formatDate(booking.date),
        time: booking.time,
        price: booking.price,
        status: booking.status,
      };
    },
  },
};
