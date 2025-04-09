const formatDate = (timestamp) => {
  if (!timestamp) return null; // Handle null or undefined timestamps
  const date = new Date(timestamp); // Directly create a Date object from the timestamp
  return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0]; // Handle invalid timestamps
};

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
    getBookingsByCustomerId: async (_, { customerId }, { db }) => {
      const customerIdInt = parseInt(customerId, 10);
      if (isNaN(customerIdInt)) {
        return [];
      }

      const bookings = await db
        .query(
          `SELECT b.*, scd.name AS serviceCenterName, scd.address AS serviceCenterAddress, scd.mobile AS serviceCenterMobile
           FROM bookings b
           LEFT JOIN serviceCentersData scd ON b.service_center_id = scd.id
           WHERE b.customer_id = $1`,
          [customerIdInt]
        )
        .then((res) => res.rows);

      const mappedBookings = bookings.map((booking) => ({
        id: booking.id,
        customerId: booking.customer_id,
        serviceCenterId: booking.service_center_id,
        serviceType: booking.service_type,
        date: formatDate(booking.date),
        time: booking.time,
        price: booking.price,
        status: booking.status,
        serviceCenter: {
          name: booking.servicecentername,
          address: booking.servicecenteraddress,
          mobile: booking.servicecentermobile,
        },
      }));

      const filteredBookings = mappedBookings.filter(
        (booking) => booking.date !== null
      );

      return filteredBookings;
    },
  },
  Mutation: {
    addBooking: async (
      _,
      { customerId, serviceCenterId, serviceType, date, time, price, status },
      { db }
    ) => {
      // Combine date and time into a valid Date object
      const dateTimeString = `${date}T${time}:00`;
      const bookingDate = new Date(dateTimeString);

      if (isNaN(bookingDate.getTime())) {
        throw new RangeError("Invalid time value");
      }

      const result = await db.query(
        "INSERT INTO bookings (customer_id, service_center_id, service_type, date, time, price, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, customer_id, service_center_id, service_type, date, time, price, status",
        [
          customerId,
          serviceCenterId,
          serviceType,
          bookingDate.toISOString().split("T")[0],
          time,
          price,
          status,
        ]
      );

      const booking = result.rows[0];
      if (!booking) {
        throw new Error("Failed to create booking");
      }

      // Map database fields to GraphQL response fields
      return {
        id: booking.id,
        customerId: booking.customer_id,
        serviceCenterId: booking.service_center_id,
        serviceType: booking.service_type,
        date: booking.date,
        time: booking.time,
        price: booking.price,
        status: booking.status,
      };
    },
  },
};
