const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    getServiceCentersData: async (_, __, { db }) => {
      return await db
        .query("SELECT * FROM serviceCentersData")
        .then((res) => res.rows);
    },
    getServiceCenterDataById: async (_, { id }, { db }) => {
      return await db
        .query(
          `SELECT scd.*, sc.email, sc.password 
           FROM serviceCentersData scd 
           JOIN service_centers sc ON scd.service_center_id = sc.id 
           WHERE scd.id = $1`,
          [id]
        )
        .then((res) => res.rows[0]);
    },
    getServiceCenterDataByServiceCenterId: async (
      _,
      { service_center_id },
      { db }
    ) => {
      return await db
        .query(
          `SELECT scd.*, sc.email, sc.password 
           FROM serviceCentersData scd 
           JOIN service_centers sc ON scd.service_center_id = sc.id 
           WHERE scd.service_center_id = $1`,
          [service_center_id]
        )
        .then((res) => res.rows[0]);
    },
    getServiceTypesByServiceCenterId: async (
      _,
      { service_center_id },
      { db }
    ) => {
      return await db
        .query("SELECT * FROM service_types WHERE service_center_id = $1", [
          service_center_id,
        ])
        .then((res) => res.rows[0]);
    },
  },
  Mutation: {
    addServiceCenterData: async (
      _,
      { name, mobile, address, service_center_id, email, password },
      { db }
    ) => {
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const result = await db.query(
        "INSERT INTO serviceCentersData (name, mobile, address, service_center_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, mobile, address, service_center_id]
      );

      if (email || hashedPassword) {
        await db.query(
          "INSERT INTO service_centers (email, password) VALUES ($1, $2)",
          [email, hashedPassword]
        );
      }

      return result.rows[0];
    },
    updateServiceCenterData: async (
      _,
      { service_center_id, name, mobile, address, email, password },
      { db }
    ) => {
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const result = await db.query(
        `UPDATE serviceCentersData 
         SET name = COALESCE($1, name), 
             mobile = COALESCE($2, mobile), 
             address = COALESCE($3, address) 
         WHERE service_center_id = $4 
         RETURNING *`,
        [name, mobile, address, service_center_id]
      );

      if (email || hashedPassword) {
        await db.query(
          `UPDATE service_centers 
           SET email = COALESCE($1, email), 
               password = COALESCE($2, password) 
           WHERE id = $3`,
          [email, hashedPassword, service_center_id]
        );
      }

      return result.rows[0];
    },
    deleteServiceCenterData: async (_, { id }, { db }) => {
      await db.query("DELETE FROM serviceCentersData WHERE id = $1", [id]);
      return "Service center data deleted successfully.";
    },
    addServiceType: async (
      _,
      {
        service_center_id,
        basic_price,
        half_service_price,
        full_service_price,
        comprehensive_price,
      },
      { db }
    ) => {
      const result = await db.query(
        `INSERT INTO service_types 
         (service_center_id, basic_price, half_service_price, full_service_price, comprehensive_price) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [
          service_center_id,
          basic_price,
          half_service_price,
          full_service_price,
          comprehensive_price,
        ]
      );
      return result.rows[0];
    },
    updateServiceType: async (
      _,
      {
        id,
        basic_price,
        half_service_price,
        full_service_price,
        comprehensive_price,
      },
      { db }
    ) => {
      const result = await db.query(
        `UPDATE service_types 
         SET basic_price = COALESCE($1, basic_price), 
             half_service_price = COALESCE($2, half_service_price), 
             full_service_price = COALESCE($3, full_service_price), 
             comprehensive_price = COALESCE($4, comprehensive_price) 
         WHERE id = $5 
         RETURNING *`,
        [
          basic_price,
          half_service_price,
          full_service_price,
          comprehensive_price,
          id,
        ]
      );
      return result.rows[0];
    },
    deleteServiceType: async (_, { id }, { db }) => {
      await db.query("DELETE FROM service_types WHERE id = $1", [id]);
      return "Service type deleted successfully.";
    },
  },
};
