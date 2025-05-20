const bcrypt = require("bcryptjs"); // Add bcryptjs for password hashing

module.exports = {
  Query: {
    getCustomersData: async (_, __, { db }) => {
      return await db
        .query("SELECT * FROM customersdata")
        .then((res) => res.rows);
    },
    getCustomerDataById: async (_, { customer_id }, { db }) => {
      return await db
        .query(
          `SELECT cd.*, c.email, c.password 
           FROM customersdata cd 
           JOIN customers c ON cd.customer_id = c.id 
           WHERE cd.customer_id = $1`,
          [customer_id]
        )
        .then((res) => res.rows[0]);
    },
    getAllCustomerDetails: async (_, __, { db }) => {
      try {
        const customers = await db.query(
          `SELECT cd.id, cd.name, cd.mobile, cd.address, c.email 
           FROM customersdata cd 
           LEFT JOIN customers c ON cd.customer_id = c.id`
        );

        const totalCount = customers.rowCount;

        return {
          totalCount,
          customerDetails: customers.rows,
        };
      } catch (error) {
        throw new Error("Failed to fetch customer details");
      }
    },
  },
  Mutation: {
    addCustomerData: async (
      _,
      { name, mobile, address, customer_id },
      { db }
    ) => {
      const result = await db.query(
        "INSERT INTO customersdata (name, mobile, address, customer_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, mobile, address, customer_id]
      );
      return result.rows[0];
    },
    updateCustomerData: async (
      _,
      { customer_id, name, mobile, address, email, password },
      { db }
    ) => {
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const result = await db.query(
        `UPDATE customersdata 
         SET name = COALESCE($1, name), 
             mobile = COALESCE($2, mobile), 
             address = COALESCE($3, address)
         WHERE customer_id = $4 
         RETURNING *`,
        [name, mobile, address, customer_id]
      );

      if (email || hashedPassword) {
        await db.query(
          `UPDATE customers 
           SET email = COALESCE($1, email), 
               password = COALESCE($2, password) 
           WHERE id = $3`,
          [email, hashedPassword, customer_id]
        );
      }

      return result.rows[0];
    },
    deleteCustomerData: async (_, { id }, { db }) => {
      await db.query("DELETE FROM customersdata WHERE id = $1", [id]);
      return "Customer data deleted successfully.";
    },
  },
};
