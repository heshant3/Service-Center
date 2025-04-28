import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { toast, Toaster } from "sonner";

import styles from "./SignupPage.module.css";

// GraphQL mutations
const REGISTER_CUSTOMER = gql`
  mutation RegisterCustomer($email: String!, $password: String!) {
    registerCustomer(email: $email, password: $password) {
      id
      email
    }
  }
`;

const REGISTER_ADMIN = gql`
  mutation RegisterAdmin($email: String!, $password: String!) {
    registerAdmin(email: $email, password: $password) {
      id
      email
    }
  }
`;

const REGISTER_SERVICE_CENTER = gql`
  mutation RegisterServiceCenter($email: String!, $password: String!) {
    registerServiceCenter(email: $email, password: $password) {
      id
      email
    }
  }
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("customer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerCustomer] = useMutation(REGISTER_CUSTOMER);
  const [registerAdmin] = useMutation(REGISTER_ADMIN);
  const [registerServiceCenter] = useMutation(REGISTER_SERVICE_CENTER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      if (accountType === "customer") {
        await registerCustomer({ variables: { email, password } });
      } else if (accountType === "admin") {
        await registerAdmin({ variables: { email, password } });
      } else if (accountType === "serviceCenter") {
        await registerServiceCenter({ variables: { email, password } });
      }
      toast.success("Registration successful!"); // Replaced alert with toast
      navigate("/login"); // Navigate to login page
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again."); // Replaced alert with toast
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.leftPanel}>
        <div className={styles.overlay}>
          <h1>Vehicle Service Hub</h1>
          <p>Your trusted partner in vehicle care</p>
        </div>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <h2>Create Account</h2>
          <p className={styles.subtitle}>
            Get started with Vehicle Service Hub
          </p>

          <div className={styles.userTypes}>
            <button
              className={`${styles.userTypeBtn} ${
                accountType === "customer" ? styles.active : ""
              }`}
              onClick={() => setAccountType("customer")}
            >
              <div className={styles.userTypeIcon}>👤</div>
              <div>
                <h3>Customer</h3>
                <p>Book services</p>
              </div>
            </button>

            <button
              className={`${styles.userTypeBtn} ${
                accountType === "serviceCenter" ? styles.active : ""
              }`}
              onClick={() => setAccountType("serviceCenter")}
            >
              <div className={styles.userTypeIcon}>🔧</div>
              <div>
                <h3>Service Center</h3>
                <p>Manage services</p>
              </div>
            </button>

            <button
              className={`${styles.userTypeBtn} ${
                accountType === "admin" ? styles.active : ""
              }`}
              onClick={() => setAccountType("admin")}
            >
              <div className={styles.userTypeIcon}>⚙️</div>
              <div>
                <h3>Admin</h3>
                <p>System control</p>
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={"password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Create Account
            </button>

            <p className={styles.signupPrompt}>
              Already have an account?{" "}
              <Link to="/login" className={styles.signupLink}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
