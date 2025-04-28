import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { toast, Toaster } from "sonner";
import styles from "./LoginPage.module.css";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginCustomer] = useMutation(LOGIN_CUSTOMER);
  const [loginAdmin] = useMutation(LOGIN_ADMIN);
  const [loginServiceCenter] = useMutation(LOGIN_SERVICE_CENTER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (accountType === "customer") {
        data = await loginCustomer({
          variables: { email, password },
        });
      } else if (accountType === "admin") {
        data = await loginAdmin({
          variables: { email, password },
        });
      } else if (accountType === "serviceCenter") {
        data = await loginServiceCenter({
          variables: { email, password },
        });
      }

      if (data && data.data) {
        const roleToDashboard = {
          customer: "/customer-dashboard",
          admin: "/admin-dashboard",
          serviceCenter: "/service-center-dashboard",
        };
        const userRole = accountType;
        localStorage.setItem(
          `${userRole}Id`,
          data.data[`login${capitalize(userRole)}`].id
        ); // Save user ID
        navigate(roleToDashboard[userRole]); // Redirect to dashboard
      } else {
        toast.error("Invalid email or password. Please try again."); // Show error toast
      }
    } catch (error) {
      toast.error("Invalid email or password. Please try again."); // Show error toast
      console.error("Login failed", error);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.leftPanel}>
        <div className={styles.overlay}>
          <h1>AutoServe Hub</h1>
          <p>Your trusted partner in vehicle care</p>
        </div>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <h2>Welcome Back</h2>
          <p className={styles.subtitle}>Sign in to continue</p>

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
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.showPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className={styles.rememberForgot}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Sign In
            </button>

            <p className={styles.signupPrompt}>
              Don't have an account?{" "}
              <Link to="/signup" className={styles.signupLink}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
