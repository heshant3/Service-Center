import React from "react";
import { Link } from "react-router-dom";
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  return (
    <div className={styles.signupContainer}>
      <h1>Create Your Account</h1>
      <div className={styles.signupBox}>
        <h2>Signup</h2>
        <p>Fill in the details to create your account</p>
        <form>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />
          <label>Account Type</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="accountType"
                value="customer"
                defaultChecked
              />
              Customer
            </label>
            <label>
              <input type="radio" name="accountType" value="serviceCenter" />
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
