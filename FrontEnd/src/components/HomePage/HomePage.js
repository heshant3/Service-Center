import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/service-center-details");
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Find Service Centers</h1>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search by name, location, or service" />
        <button>Search</button>
      </div>
      <div className={styles.serviceCards}>
        <div className={styles.card}>
          <h3>Express Auto Service</h3>
          <p>123 Main St, Anytown, CA</p>
          <p>
            <span className={styles.rating}>⭐ 4.8</span> (45 reviews)
          </p>
          <p>
            Fast and reliable auto service center specializing in quick
            maintenance.
          </p>
          <p>
            <strong>Services</strong>
          </p>
          <div className={styles.services}>
            <span>Oil Change</span>
            <span>Tire Rotation</span>
            <span>Brake Service</span>
          </div>
          <button className={styles.detailsButton} onClick={handleViewDetails}>
            View Details
          </button>
        </div>
        <div className={styles.card}>
          <h3>City Mechanics</h3>
          <p>456 Oak Ave, Anytown, CA</p>
          <p>
            <span className={styles.rating}>⭐ 4.5</span> (32 reviews)
          </p>
          <p>
            Complete vehicle service and repair shop with certified mechanics.
          </p>
          <p>
            <strong>Services</strong>
          </p>
          <div className={styles.services}>
            <span>Engine Repair</span>
            <span>Transmission Service</span>
            <span>Full Inspection</span>
          </div>
          <button className={styles.detailsButton} onClick={handleViewDetails}>
            View Details
          </button>
        </div>
        <div className={styles.card}>
          <h3>Quick Fix Auto</h3>
          <p>789 Pine St, Anytown, CA</p>
          <p>
            <span className={styles.rating}>⭐ 4.2</span> (28 reviews)
          </p>
          <p>Convenient auto repair with same-day service for most repairs.</p>
          <p>
            <strong>Services</strong>
          </p>
          <div className={styles.services}>
            <span>Oil Change</span>
            <span>Battery Replacement</span>
            <span>A/C Service</span>
          </div>
          <button className={styles.detailsButton} onClick={handleViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
