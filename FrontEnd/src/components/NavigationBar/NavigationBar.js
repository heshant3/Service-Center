import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa"; // Import car icon
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    localStorage.getItem("customerId") ||
    localStorage.getItem("adminId") ||
    localStorage.getItem("serviceCenterId");

  const handleLogout = () => {
    localStorage.clear(); // Clear all user data
    navigate("/"); // Redirect to the home page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <FaCar className={styles.carIcon} /> AutoServe Hub
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Find Service Centers</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup" className={styles.signupButton}>
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
