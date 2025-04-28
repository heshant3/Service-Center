import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar, FaUser } from "react-icons/fa"; // Import car and user icons
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");
  const adminId = localStorage.getItem("adminId");
  const serviceCenterId = localStorage.getItem("serviceCenterId");

  const isLoggedIn = customerId || adminId || serviceCenterId;

  const handleLogout = () => {
    localStorage.clear(); // Clear all user data
    navigate("/"); // Redirect to the home page
  };

  const handleDashboardNavigation = () => {
    if (customerId) {
      navigate("/customer-dashboard");
    } else if (adminId) {
      navigate("/admin-dashboard");
    } else if (serviceCenterId) {
      navigate("/service-center-dashboard");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <FaCar className={styles.carIcon} /> AutoServe Hub
        </Link>
      </div>
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/">Find Service Centers</Link>
          </li>
          {isLoggedIn ? (
            <li className={styles.userMenu} ref={dropdownRef}>
              <FaUser
                className={styles.userIcon}
                onClick={toggleDropdown}
                title="User Menu"
              />
              {dropdownVisible && (
                <div className={styles.dropdownMenu}>
                  <button
                    className={styles.dropdownItem}
                    onClick={handleDashboardNavigation}
                  >
                    Dashboard
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles.loginLink}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className={styles.signupButton}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
