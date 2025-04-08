import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">AutoServe Hub</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/find-service-centers">Find Service Centers</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup" className={styles.signupButton}>
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
