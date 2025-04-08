import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { toast, Toaster } from "sonner"; // Import toast from sonner
import styles from "./LoginPage.module.css";

// GraphQL mutation for customer login
const LOGIN_CUSTOMER = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    loginCustomer(email: $email, password: $password) {
      id
      email
    }
  }
`;

// GraphQL mutation for admin login
const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      id
      email
    }
  }
`;

// GraphQL mutation for service center login
const LOGIN_SERVICE_CENTER = gql`
  mutation LoginServiceCenter($email: String!, $password: String!) {
    loginServiceCenter(email: $email, password: $password) {
      id
      email
    }
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("customer");
  const navigate = useNavigate();
  const [loginCustomer] = useMutation(LOGIN_CUSTOMER);
  const [loginAdmin] = useMutation(LOGIN_ADMIN);
  const [loginServiceCenter] = useMutation(LOGIN_SERVICE_CENTER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accountType === "customer") {
      try {
        const { data } = await loginCustomer({
          variables: { email, password },
        });
        if (data.loginCustomer) {
          localStorage.setItem("customerId", data.loginCustomer.id); // Save customer ID
          navigate("/customer-dashboard");
        } else {
          toast.error("Invalid email or password. Please try again."); // Show error toast
        }
      } catch (error) {
        toast.error("Invalid email or password. Please try again."); // Show error toast
        console.error("Login failed", error);
      }
    } else if (accountType === "admin") {
      try {
        const { data } = await loginAdmin({
          variables: { email, password },
        });
        if (data.loginAdmin) {
          localStorage.setItem("adminId", data.loginAdmin.id); // Save admin ID
          navigate("/admin-dashboard");
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } catch (error) {
        toast.error("Invalid email or password. Please try again.");
        console.error("Login failed", error);
      }
    } else if (accountType === "serviceCenter") {
      try {
        const { data } = await loginServiceCenter({
          variables: { email, password },
        });
        if (data.loginServiceCenter) {
          localStorage.setItem("serviceCenterId", data.loginServiceCenter.id); // Save service center ID
          navigate("/service-center-dashboard");
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } catch (error) {
        toast.error("Invalid email or password. Please try again.");
        console.error("Login failed", error);
      }
    } else {
      toast.error("Unsupported account type.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Toaster />
      <h1>Login to Your Account</h1>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Account Type</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="accountType"
                value="customer"
                checked={accountType === "customer"}
                onChange={(e) => setAccountType(e.target.value)}
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="serviceCenter"
                onChange={(e) => setAccountType(e.target.value)}
              />
              Service Center
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="admin"
                onChange={(e) => setAccountType(e.target.value)}
              />
              Admin
            </label>
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
      <footer className={styles.footer}>
        © 2025 AutoServe Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
