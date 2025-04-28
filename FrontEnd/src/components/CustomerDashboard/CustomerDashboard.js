import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client"; // Import Apollo Client hooks
import styles from "./CustomerDashboard.module.css";
import { toast, Toaster } from "sonner";
import AIChat from "../AiChat/Chat";
import AddReview from "../AddReview/AddReview"; // Import AddReview component

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

// Updated GraphQL mutation to add feedback
const ADD_FEEDBACK = gql`
  mutation AddFeedback($bookingId: ID!, $feedback: String, $rating: Float) {
    addFeedback(bookingId: $bookingId, feedback: $feedback, rating: $rating) {
      id
      bookingId
      customerId
      serviceCenterId
      serviceType
      feedback
      rating
    }
  }
`;

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    password: "********",
    customer_id: "", // Add customer_id to profile state
  });
  const [selectedBooking, setSelectedBooking] = useState(null); // State for selected booking
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [showReviewModal, setShowReviewModal] = useState(false); // State for AddReview modal
  const [reviewedBookings, setReviewedBookings] = useState([]); // Track reviewed bookings

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

  // GraphQL mutation to add feedback
  const [addFeedback] = useMutation(ADD_FEEDBACK); // Initialize the updated mutation

  // Update profile state when data is fetched
  useEffect(() => {
    if (data && data.getCustomerDataById) {
      const { name, address, mobile, email, customer_id } =
        data.getCustomerDataById; // Include customer_id
      setProfile((prevProfile) => ({
        ...prevProfile,
        name,
        address,
        mobile,
        email,
        customer_id, // Update customer_id in profile
      }));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading customer data.</p>;

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking); // Set the selected booking
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
    setSelectedBooking(null); // Clear the selected booking
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

  const handleAddReview = (booking) => {
    setSelectedBooking(booking); // Set the entire booking object for review
    setShowReviewModal(true); // Show the AddReview modal
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      const { feedback, rating } = reviewData;
      await addFeedback({
        variables: {
          bookingId: selectedBooking.id, // Use the booking ID from the selected booking
          feedback,
          rating,
        },
      });
      toast.success("Review submitted successfully!");
      setReviewedBookings((prev) => [...prev, selectedBooking.id]); // Mark booking as reviewed
      setShowReviewModal(false); // Close the modal
    } catch (error) {
      toast.error("Failed to submit review.");
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

  const handleCancelEdit = () => {
    if (data && data.getCustomerDataById) {
      const { name, address, mobile, email, customer_id } =
        data.getCustomerDataById;
      setProfile((prevProfile) => ({
        ...prevProfile,
        name,
        address,
        mobile,
        email,
        customer_id, // Reset profile to original data
        password: "********", // Reset password field
      }));
    }
    setIsEditing(false); // Exit edit mode
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

  // Calculate counts based on status
  const totalAppointments = bookingsData?.getBookingsByCustomerId?.length || 0;
  const upcomingAppointments =
    bookingsData?.getBookingsByCustomerId?.filter(
      (booking) =>
        booking.status === "Confirmed" || booking.status === "pending"
    ).length || 0;
  const completedServices =
    bookingsData?.getBookingsByCustomerId?.filter(
      (booking) => booking.status === "Completed"
    ).length || 0;
  const totalSpending =
    bookingsData?.getBookingsByCustomerId?.reduce(
      (sum, booking) =>
        booking.status === "Completed" ? sum + booking.price : sum,
      0
    ) || 0;

  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        if (bookingsLoading) return <p>Loading appointments...</p>;
        if (bookingsError) return <p>Error loading appointments.</p>;

        return (
          <div className={styles.tabContent}>
            <div className={styles.appointmentsList}>
              {bookingsData?.getBookingsByCustomerId.map((booking) => (
                <div key={booking.id} className={styles.appointment}>
                  <div>
                    <h4>{booking.serviceCenter.name}</h4>
                    <p>{booking.serviceType}</p>
                    <p>
                      Date: {booking.date} at {booking.time}
                    </p>
                  </div>
                  <div className={styles.appointmentActions}>
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewDetails(booking)}
                    >
                      View Details
                    </button>
                    {["Confirmed", "pending"].includes(booking.status) && (
                      <button
                        className={styles.cancelButton}
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </button>
                    )}
                    {booking.status === "Completed" &&
                      !reviewedBookings.includes(booking.id) && (
                        <button
                          className={styles.submitButton}
                          onClick={() => handleAddReview(booking)}
                        >
                          Add Review
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "upcoming":
        return (
          <div className={styles.tabContent}>
            <div className={styles.appointmentsList}>
              {bookingsData?.getBookingsByCustomerId
                ?.filter((booking) => booking.status === "pending")
                .map((booking) => (
                  <div key={booking.id} className={styles.appointment}>
                    <div>
                      <h4>{booking.serviceCenter.name}</h4>
                      <p>{booking.serviceType}</p>
                      <p>
                        Date: {booking.date} at {booking.time}
                      </p>
                    </div>
                    <div className={styles.appointmentActions}>
                      <button
                        className={styles.viewButton}
                        onClick={() => handleViewDetails(booking)}
                      >
                        View Details
                      </button>
                      <button
                        className={styles.cancelButton}
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}

              {/* Add logic to show the "Add Review" button only once for completed bookings */}
            </div>
          </div>
        );

      case "profile":
        return (
          <div
            className={`${styles.tabContent} ${styles.personalInfoContainer}`}
          >
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.personalInfoCard}>
              {isEditing ? (
                <>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Name:</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Address:</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Mobile Number:</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      name="mobile"
                      value={profile.mobile}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Email:</label>
                    <input
                      className={styles.inputField}
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Password:</label>
                    <input
                      className={styles.inputField}
                      type="password"
                      name="password"
                      value={profile.password}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Customer ID:</label>
                    <span className={styles.inputStatic}>
                      {profile.customer_id}
                    </span>
                  </div>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.saveButton}
                      onClick={handleEditToggle}
                    >
                      Save
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.infoGroup}>
                    <label className={styles.infoLabel}>Name:</label>
                    <span className={styles.infoValue}>{profile.name}</span>
                  </div>
                  <div className={styles.infoGroup}>
                    <label className={styles.infoLabel}>Address:</label>
                    <span className={styles.infoValue}>{profile.address}</span>
                  </div>
                  <div className={styles.infoGroup}>
                    <label className={styles.infoLabel}>Mobile Number:</label>
                    <span className={styles.infoValue}>{profile.mobile}</span>
                  </div>
                  <div className={styles.infoGroup}>
                    <label className={styles.infoLabel}>Email:</label>
                    <span className={styles.infoValue}>{profile.email}</span>
                  </div>
                  <div className={styles.infoGroup}>
                    <label className={styles.infoLabel}>Password:</label>
                    <span className={styles.infoValue}>{profile.password}</span>
                  </div>
                  <div className={styles.infoGroup}>
                    <label className={styles.infoLabel}>Customer ID:</label>
                    <span className={styles.infoValue}>
                      {profile.customer_id}
                    </span>
                  </div>
                  <button
                    className={styles.editButton}
                    onClick={handleEditToggle}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
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
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <p>Total Appointments</p>
          <h2>{totalAppointments}</h2>
        </div>
        <div className={styles.statCard}>
          <p>Upcoming Appointments</p>
          <h2>{upcomingAppointments}</h2>
        </div>
        <div className={styles.statCard}>
          <p>Completed Services</p>
          <h2>{completedServices}</h2>
        </div>
        <div className={styles.statCard}>
          <p>Total Spending</p>
          <h2>Rs: {totalSpending}</h2>
        </div>
      </div>
      <div className={styles.tabs}>
        <button
          className={activeTab === "appointments" ? styles.activeTab : ""}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={activeTab === "upcoming" ? styles.activeTab : ""}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Appointments (
          {bookingsData?.getBookingsByCustomerId?.filter(
            (booking) => booking.status === "pending"
          ).length || 0}
          )
        </button>
        <button
          className={activeTab === "profile" ? styles.activeTab : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>
      {renderContent()}
      <footer className={styles.footer}>
        © 2025 AutoServe Hub. All rights reserved.
      </footer>

      {/* Popup Card */}
      {showPopup && selectedBooking && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupCard}>
            <h3>Booking Details</h3>
            <p>
              <strong>Service Center:</strong>{" "}
              {selectedBooking.serviceCenter.name}
            </p>
            <p>
              <strong>Service Type:</strong> {selectedBooking.serviceType}
            </p>
            <p>
              <strong>Date:</strong> {selectedBooking.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedBooking.time}
            </p>
            <p>
              <strong>Price:</strong> Rs.{selectedBooking.price}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={getStatusClass(selectedBooking.status)}>
                {selectedBooking.status}
              </span>
            </p>
            <button className={styles.closeButton} onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {showReviewModal && (
        <AddReview
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
