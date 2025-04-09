import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client"; // Import Apollo Client hooks
import styles from "./CustomerDashboard.module.css";
import { toast, Toaster } from "sonner";
import AIChat from "../AiChat/Chat";

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

// GraphQL query to fetch bookings by customer ID
const GET_BOOKINGS_BY_CUSTOMER_ID = gql`
  query GetBookingsByCustomerId($customerId: ID!) {
    getBookingsByCustomerId(customerId: $customerId) {
      id
      serviceType
      date
      time
      price
      status
      serviceCenter {
        name
        address
        mobile
      }
    }
  }
`;

// GraphQL mutation to cancel a booking by ID
const CANCEL_BOOKING_BY_ID = gql`
  mutation CancelBookingById($bookingId: ID!) {
    cancelBookingById(bookingId: $bookingId)
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
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch customer ID from local storage
  const customerId = localStorage.getItem("customerId");

  console.log(customerId);

  // Use Apollo Client's useQuery hook to fetch data
  const { data, loading, error } = useQuery(GET_CUSTOMER_DATA_BY_ID, {
    variables: { id: customerId },
    skip: !customerId, // Skip query if customerId is not available
  });

  // Use Apollo Client's useQuery hook to fetch bookings
  const {
    data: bookingsData,
    loading: bookingsLoading,
    error: bookingsError,
    refetch: refetchBookings, // Add refetch function
  } = useQuery(GET_BOOKINGS_BY_CUSTOMER_ID, {
    variables: { customerId },
    skip: !customerId,
  });

  // Use Apollo Client's useMutation hook to update data
  const [updateCustomerData] = useMutation(UPDATE_CUSTOMER_DATA); // Initialize mutation

  // Use Apollo Client's useMutation hook to cancel a booking
  const [cancelBooking] = useMutation(CANCEL_BOOKING_BY_ID);

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

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking({ variables: { bookingId } });
      toast.success("Booking canceled successfully!");
      refetchBookings(); // Refetch bookings after cancellation
    } catch (error) {
      toast.error("Failed to cancel booking.");
    }
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
        } else {
          toast.error("No changes detected.");
        }
      } catch (error) {
        toast.error("Failed to update profile.", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return styles.statusConfirmed; // Blue
      case "Completed":
        return styles.statusCompleted; // Green
      case "Cancelled":
        return styles.statusCancelled; // Red
      default:
        return styles.statusPending; // Default (Pending)
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        if (bookingsLoading) return <p>Loading appointments...</p>;
        if (bookingsError) return <p>Error loading appointments.</p>;

        return (
          <div className={styles.tabContent}>
            <h3>Appointments</h3>
            <div className={styles.appointmentsList}>
              {bookingsData?.getBookingsByCustomerId.map((booking) => (
                <div key={booking.id} className={styles.appointment}>
                  <div>
                    <h4>{booking.serviceCenter.name}</h4>
                    <p>{booking.serviceType}</p>
                    <p>
                      Date: {booking.date} at {booking.time}
                    </p>
                    <button onClick={() => handleViewDetails(booking)}>
                      View Details
                    </button>
                    {["Confirmed", "pending"].includes(booking.status) && (
                      <>
                        {" | "}
                        <button
                          className={styles.cancel}
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                  <span className={getStatusClass(booking.status)}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
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
      <AIChat />
      <Toaster />
      <h1>Customer Dashboard</h1>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <p>Total Appointments</p>
          <h2>{bookingsData?.getBookingsByCustomerId?.length || 0}</h2>
        </div>
      </div>
      <div className={styles.tabs}>
        <button
          className={activeTab === "appointments" ? styles.activeTab : ""}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments{" "}
          {bookingsData?.getBookingsByCustomerId?.length > 0 &&
            `(${bookingsData.getBookingsByCustomerId.length})`}
        </button>

        <button
          className={activeTab === "profile" ? styles.activeTab : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>
      {renderContent()}
      {showModal && selectedBooking && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Appointment Details</h2>
            <div className={styles.modalContent}>
              <div className={styles.serviceInfo}>
                <h3>{selectedBooking.serviceType}</h3>
                <p>
                  • Price Rs.
                  {selectedBooking.price}
                </p>
              </div>
              <div className={styles.serviceCenterInfo}>
                <p>
                  <strong>{selectedBooking.serviceCenter.name}</strong>
                </p>
                <p>{selectedBooking.serviceCenter.address}</p>
                <p>Phone: {selectedBooking.serviceCenter.mobile}</p>
              </div>
              <div className={styles.dateTime}>
                <p>
                  <strong>Date:</strong> {selectedBooking.date}
                </p>
                <p>
                  <strong>Time:</strong> {selectedBooking.time}
                </p>
              </div>
              <div className={styles.status}>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={getStatusClass(selectedBooking.status)}>
                    {selectedBooking.status}
                  </span>
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
