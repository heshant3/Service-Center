import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate import
import { useMutation, gql } from "@apollo/client";
import { toast, Toaster } from "sonner"; // Added sonner imports
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
  const navigate = useNavigate(); // Initialize navigate function
  const [accountType, setAccountType] = useState("customer"); // State for account type
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

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
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
    <div className={styles.signupContainer}>
      <Toaster /> {/* Added Toaster component */}
      <h1>Create Your Account</h1>
      <div className={styles.signupBox}>
        <h2>Signup</h2>
        <p>Fill in the details to create your account</p>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <label>Account Type</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="accountType"
                value="customer"
                checked={accountType === "customer"}
                onChange={handleAccountTypeChange}
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="admin"
                checked={accountType === "admin"}
                onChange={handleAccountTypeChange}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="serviceCenter"
                checked={accountType === "serviceCenter"}
                onChange={handleAccountTypeChange}
              />
              Service Center
            </label>
          </div>
          <button type="submit" className={styles.signupButton}>
            Signup
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
