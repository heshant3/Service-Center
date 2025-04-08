import React from "react";
import styles from "./ServiceCenterDetails.module.css";

const ServiceCenterDetails = () => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsContent}>
        <div className={styles.imageSection}>
          <div className={styles.imagePlaceholder}>Image</div>
        </div>
        <div className={styles.infoSection}>
          <h2>Express Auto Service</h2>
          <p>
            <span className={styles.rating}>⭐ 4.8</span> (45 reviews)
          </p>
          <p>123 Main St, Anytown, CA</p>
          <p>
            Fast and reliable auto service center specializing in quick
            maintenance.
          </p>
          <div className={styles.businessInfo}>
            <p>
              <strong>Business Hours</strong>
              <br />
              Mon-Fri: 8am-6pm, Sat: 9am-4pm, Sun: Closed
            </p>
            <p>
              <strong>Contact</strong>
              <br />
              (555) 123-4567
              <br />
              info@expressauto.com
            </p>
          </div>
        </div>
        <div className={styles.bookingSection}>
          <h2>Book an Appointment</h2>
          <button className={styles.bookButton}>Book Now</button>
          <div className={styles.bookingInfo}>
            <p>Why book with AutoServe Hub?</p>
            <ul>
              <li>Instant confirmation</li>
              <li>Transparent pricing</li>
              <li>Free cancellation 24h in advance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenterDetails;
