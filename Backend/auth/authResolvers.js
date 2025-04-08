const bcrypt = require("bcryptjs"); // Changed from bcrypt to bcryptjs
const db = require("../database/connection");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return db
        .query("SELECT id, email FROM customers WHERE id = $1", [user.id])
        .then((res) => res.rows[0]);
    },
  },
  Mutation: {
    registerCustomer: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        "INSERT INTO customers (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword]
      );
      const customer = result.rows[0];
      if (!customer) {
        throw new Error("Failed to register customer");
      }

      // Create an empty entry in the customersdata table
      await db.query(
        "INSERT INTO customersdata (name, mobile, address, customer_id) VALUES ($1, $2, $3, $4)",
        ["", "", "", customer.id]
      );

      return customer;
    },
    loginCustomer: async (_, { email, password }) => {
      const result = await db.query(
        "SELECT * FROM customers WHERE email = $1",
        [email]
      );
      const customer = result.rows[0];
      if (!customer) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(password, customer.password);
      if (!valid) throw new Error("Invalid credentials");
      return { id: customer.id, email: customer.email };
    },
    registerAdmin: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        "INSERT INTO admins (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword]
      );
      const admin = result.rows[0];
      if (!admin) {
        throw new Error("Failed to register admin");
      }
      return admin;
    },
    loginAdmin: async (_, { email, password }) => {
      const result = await db.query("SELECT * FROM admins WHERE email = $1", [
        email,
      ]);
      const admin = result.rows[0];
      if (!admin) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) throw new Error("Invalid credentials");
      return { id: admin.id, email: admin.email };
    },
    registerServiceCenter: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        "INSERT INTO service_centers (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword]
      );
      const serviceCenter = result.rows[0];
      if (!serviceCenter) {
        throw new Error("Failed to register service center");
      }

      // Create an empty entry in the serviceCentersData table
      await db.query(
        "INSERT INTO serviceCentersData (name, mobile, address, service_center_id) VALUES ($1, $2, $3, $4)",
        ["", "", "", serviceCenter.id]
      );

      return serviceCenter;
    },
    loginServiceCenter: async (_, { email, password }) => {
      const result = await db.query(
        "SELECT * FROM service_centers WHERE email = $1",
        [email]
      );
      const serviceCenter = result.rows[0];
      if (!serviceCenter) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(password, serviceCenter.password);
      if (!valid) throw new Error("Invalid credentials");
      return {
        id: serviceCenter.id,
        name: serviceCenter.name,
        email: serviceCenter.email,
      };
    },

    // Customer CRUD operations
    addCustomer: async (_, { name, mobile, address, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        "INSERT INTO customers (name, mobile, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, mobile, address, email",
        [name, mobile, address, email, hashedPassword]
      );
      return result.rows[0];
    },
    updateCustomer: async (_, { id, name, mobile, address, email }) => {
      const result = await db.query(
        "UPDATE customers SET name = COALESCE($1, name), mobile = COALESCE($2, mobile), address = COALESCE($3, address), email = COALESCE($4, email) WHERE id = $5 RETURNING id, name, mobile, address, email",
        [name, mobile, address, email, id]
      );
      if (result.rows.length === 0) throw new Error("Customer not found");
      return result.rows[0];
    },
    deleteCustomer: async (_, { id }) => {
      const result = await db.query("DELETE FROM customers WHERE id = $1", [
        id,
      ]);
      if (result.rowCount === 0) throw new Error("Customer not found");
      return "Customer deleted successfully";
    },

    // Admin CRUD operations
    addAdmin: async (_, { name, mobile, address, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        "INSERT INTO admins (name, mobile, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, mobile, address, email",
        [name, mobile, address, email, hashedPassword]
      );
      return result.rows[0];
    },
    updateAdmin: async (_, { id, name, mobile, address, email }) => {
      const result = await db.query(
        "UPDATE admins SET name = COALESCE($1, name), mobile = COALESCE($2, mobile), address = COALESCE($3, address), email = COALESCE($4, email) WHERE id = $5 RETURNING id, name, mobile, address, email",
        [name, mobile, address, email, id]
      );
      if (result.rows.length === 0) throw new Error("Admin not found");
      return result.rows[0];
    },
    deleteAdmin: async (_, { id }) => {
      const result = await db.query("DELETE FROM admins WHERE id = $1", [id]);
      if (result.rowCount === 0) throw new Error("Admin not found");
      return "Admin deleted successfully";
    },
  },
};

module.exports = resolvers;
