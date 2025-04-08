import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client"; // Import Apollo Client hooks
import styles from "./CustomerDashboard.module.css";

// GraphQL query to fetch customer data by ID
const GET_CUSTOMER_DATA_BY_ID = gql`
  query GetCustomerDataById($id: ID!) {
    getCustomerDataById(id: $id) {
      id
      name
      mobile
      address
      customer_id
      email
    }
  }
`;

// GraphQL mutation to update customer data
const UPDATE_CUSTOMER_DATA = gql`
  mutation UpdateCustomerData(
    $id: ID!
    $name: String
    $mobile: String
    $address: String
    $customer_id: Int
    $email: String
    $password: String
  ) {
    updateCustomerData(
      id: $id
      name: $name
      mobile: $mobile
      address: $address
      customer_id: $customer_id
      email: $email
      password: $password
    ) {
      id
      name
      mobile
      address
      customer_id
    }
  }
`;

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    address: "", // Moved address field below name
    mobile: "",
    email: "",
    password: "********",
  });

  // Fetch customer ID from local storage
  const customerId = localStorage.getItem("customerId");

  // Use Apollo Client's useQuery hook to fetch data
  const { data, loading, error } = useQuery(GET_CUSTOMER_DATA_BY_ID, {
    variables: { id: customerId },
    skip: !customerId, // Skip query if customerId is not available
  });

  // Use Apollo Client's useMutation hook to update data
  const [updateCustomerData] = useMutation(UPDATE_CUSTOMER_DATA); // Initialize mutation

  // Update profile state when data is fetched
  useEffect(() => {
    if (data && data.getCustomerDataById) {
      const { name, address, mobile, email } = data.getCustomerDataById; // Include email
      setProfile((prevProfile) => ({
        ...prevProfile,
        name,
        address,
        mobile,
        email, // Update email in profile
      }));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading customer data.</p>;

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const updatedFields = {};

        // Compare current profile with fetched data and include only changed fields
        if (profile.name !== data.getCustomerDataById.name) {
          updatedFields.name = profile.name;
        }
        if (profile.mobile !== data.getCustomerDataById.mobile) {
          updatedFields.mobile = profile.mobile;
        }
        if (profile.address !== data.getCustomerDataById.address) {
          updatedFields.address = profile.address;
        }
        if (profile.email !== data.getCustomerDataById.email) {
          updatedFields.email = profile.email;
        }
        if (profile.password !== "********") {
          updatedFields.password = profile.password;
        }

        // Only proceed if there are fields to update
        if (Object.keys(updatedFields).length > 0) {
          await updateCustomerData({
            variables: {
              id: customerId,
              ...updatedFields,
            },
          });
          alert("Profile updated successfully!");
        } else {
          alert("No changes detected.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <div className={styles.tabContent}>
            <h3>Upcoming & Pending Appointments</h3>
            <div className={styles.appointment}>
              <div>
                <h4>Express Auto Service</h4>
                <p>Oil Change</p>
                <p>Date: 2025-04-15 at 10:00 AM</p>
                <button onClick={handleViewDetails}>View Details</button> |{" "}
                <a href="#" className={styles.cancel}>
                  Cancel
                </a>
              </div>
              <span className={styles.statusConfirmed}>Confirmed</span>
            </div>
            <div className={styles.appointment}>
              <div>
                <h4>City Mechanics</h4>
                <p>Tire Rotation</p>
                <p>Date: 2025-04-22 at 2:30 PM</p>
                <a href="#">View Details</a> |{" "}
                <a href="#" className={styles.cancel}>
                  Cancel
                </a>
              </div>
              <span className={styles.statusPending}>Pending</span>
            </div>
          </div>
        );
      case "history":
        return (
          <div className={styles.tabContent}>
            <h3>Service History</h3>
            <p>No service history available.</p>
          </div>
        );
      case "profile":
        return (
          <div className={`${styles.tabContent} ${styles.personalInfo}`}>
            <h3>Personal Information</h3>
            {isEditing ? (
              <>
                <p>
                  <strong>Name:</strong>{" "}
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Mobile Number:</strong>{" "}
                  <input
                    type="text"
                    name="mobile"
                    value={profile.mobile}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Password:</strong>{" "}
                  <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleProfileChange}
                  />
                </p>

                <button onClick={handleEditToggle}>Save</button>
              </>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {profile.name}
                </p>
                <p>
                  <strong>Address:</strong> {profile.address}
                </p>
                <p>
                  <strong>Mobile Number:</strong> {profile.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Password:</strong> {profile.password}
                </p>

                <button onClick={handleEditToggle}>Edit</button>
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Customer Dashboard</h1>
      <div className={styles.stats}>
        <div className={styles.statCard}>Welcome</div>
        <div className={styles.statCard}>
          <p>Upcoming Appointments</p>
          <h2>1</h2>
        </div>
        <div className={styles.statCard}>
          <p>Pending Appointments</p>
          <h2>1</h2>
        </div>
      </div>
      <div className={styles.tabs}>
        <button
          className={activeTab === "appointments" ? styles.activeTab : ""}
          onClick={() => setActiveTab("appointments")}
        >
          My Appointments
        </button>
        <button
          className={activeTab === "history" ? styles.activeTab : ""}
          onClick={() => setActiveTab("history")}
        >
          Service History
        </button>
        <button
          className={activeTab === "profile" ? styles.activeTab : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>
      {renderContent()}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Appointment Details</h2>
            <div className={styles.modalContent}>
              <div className={styles.serviceInfo}>
                <h3>Oil Change</h3>
                <p>Est. 45 minutes • $49.99</p>
              </div>
              <div className={styles.serviceCenterInfo}>
                <p>
                  <strong>Express Auto Service</strong>
                </p>
                <p>123 Main Street, Cityville</p>
                <p>Phone: (555) 123-4567</p>
              </div>
              <div className={styles.dateTime}>
                <p>
                  <strong>Date:</strong> 2025-04-15
                </p>
                <p>
                  <strong>Time:</strong> 10:00 AM
                </p>
              </div>
              <div className={styles.notes}>
                <p>
                  <strong>Notes:</strong>
                </p>
                <p>Please bring your vehicle's service book</p>
              </div>
              <div className={styles.status}>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={styles.statusConfirmed}>Confirmed</span>
                </p>
              </div>
            </div>
            <button
              className={styles.closeModalButton}
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <footer className={styles.footer}>
        © 2025 AutoServe Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default CustomerDashboard;
