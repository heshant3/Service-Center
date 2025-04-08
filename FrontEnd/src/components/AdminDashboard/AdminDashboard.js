import React from "react";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1>Admin Dashboard</h1>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <p>Admins</p>
          <h2>1</h2>
        </div>
        <div className={styles.statCard}>
          <p>Service Centers</p>
          <h2>3</h2>
        </div>
        <div className={styles.statCard}>
          <p>Customers</p>
          <h2>3</h2>
        </div>
        <div className={styles.statCard}>
          <p>Total Bookings</p>
          <h2>4</h2>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <h2>Recent Bookings</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Service Center</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Express Auto Service</td>
              <td>Oil Change</td>
              <td>2025-04-15</td>
              <td className={styles.statusConfirmed}>Confirmed</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>City Mechanics</td>
              <td>Tire Rotation</td>
              <td>2025-04-16</td>
              <td className={styles.statusPending}>Pending</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mike Johnson</td>
              <td>Express Auto Service</td>
              <td>Brake Check</td>
              <td>2025-04-17</td>
              <td className={styles.statusConfirmed}>Confirmed</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Sarah Williams</td>
              <td>Quick Fix Auto</td>
              <td>Full Service</td>
              <td>2025-04-18</td>
              <td className={styles.statusPending}>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
