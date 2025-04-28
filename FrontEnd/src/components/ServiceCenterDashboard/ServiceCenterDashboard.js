import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { toast, Toaster } from "sonner"; // Import toast from sonner
import styles from "./ServiceCenterDashboard.module.css";

const GET_SERVICE_CENTER_DATA_BY_SERVICE_CENTER_ID = gql`
  query GetServiceCenterDataByServiceCenterId($service_center_id: Int!) {
    getServiceCenterDataByServiceCenterId(
      service_center_id: $service_center_id
    ) {
      id
      name
      mobile
      address
      service_center_id
      email
      password
      imageurl
      businesshours
      about
    }
  }
`;

const UPDATE_SERVICE_CENTER_DATA = gql`
  mutation UpdateServiceCenterData(
    $service_center_id: Int!
    $name: String
    $mobile: String
    $address: String
    $email: String
    $password: String
    $about: String
    $businesshours: String
    $imageurl: String
  ) {
    updateServiceCenterData(
      service_center_id: $service_center_id
      name: $name
      mobile: $mobile
      address: $address
      email: $email
      password: $password
      about: $about
      businesshours: $businesshours
      imageurl: $imageurl
    ) {
      id
      name
      mobile
      address
      about
      businesshours
      imageurl
    }
  }
`;

const GET_SERVICE_TYPES_BY_SERVICE_CENTER_ID = gql`
  query GetServiceTypesByServiceCenterId($service_center_id: Int!) {
    getServiceTypesByServiceCenterId(service_center_id: $service_center_id) {
      id
      service_center_id
      basic_price
      half_service_price
      full_service_price
      comprehensive_price
    }
  }
`;

const UPDATE_SERVICE_TYPE = gql`
  mutation UpdateServiceType(
    $service_center_id: Int!
    $basic_price: Int
    $half_service_price: Int
    $full_service_price: Int
    $comprehensive_price: Int
  ) {
    updateServiceType(
      service_center_id: $service_center_id
      basic_price: $basic_price
      half_service_price: $half_service_price
      full_service_price: $full_service_price
      comprehensive_price: $comprehensive_price
    ) {
      id
      service_center_id
      basic_price
      half_service_price
      full_service_price
      comprehensive_price
    }
  }
`;

const GET_BOOKINGS_BY_SERVICE_CENTER_ID = gql`
  query GetBookingsByServiceCenterId($serviceCenterId: ID!) {
    getBookingsByServiceCenterId(serviceCenterId: $serviceCenterId) {
      id
      customerId
      serviceCenterId
      serviceType
      date
      time
      price
      status
      customer {
        name
        mobile
      }
    }
  }
`;

const CANCEL_BOOKING_BY_ID = gql`
  mutation CancelBookingById($bookingId: ID!) {
    cancelBookingById(bookingId: $bookingId)
  }
`;

const CONFIRM_BOOKING_BY_ID = gql`
  mutation ConfirmBooking($bookingId: ID!) {
    confirmBookingById(bookingId: $bookingId)
  }
`;

const COMPLETE_BOOKING_BY_ID = gql`
  mutation CompleteBooking($bookingId: ID!) {
    completeBookingById(bookingId: $bookingId)
  }
`;

const ServiceCenterDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    address: "",
    service_center_id: "",
    email: "",
    password: "",
    about: "",
    businesshours: "",
    imageurl: "",
  });
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const [isEditingServices, setIsEditingServices] = useState(false);
  const [services, setServices] = useState([]);
  const [tempServices, setTempServices] = useState([]);

  const serviceCenterId =
    parseInt(localStorage.getItem("serviceCenterId"), 10) || 1;

  const { data, loading, error, refetch } = useQuery(
    GET_SERVICE_CENTER_DATA_BY_SERVICE_CENTER_ID,
    {
      variables: { service_center_id: serviceCenterId },
    }
  );

  const {
    data: serviceTypesData,
    loading: serviceTypesLoading,
    error: serviceTypesError,
  } = useQuery(GET_SERVICE_TYPES_BY_SERVICE_CENTER_ID, {
    variables: { service_center_id: serviceCenterId },
  });

  const {
    data: bookingsData,
    loading: bookingsLoading,
    error: bookingsError,
  } = useQuery(GET_BOOKINGS_BY_SERVICE_CENTER_ID, {
    variables: { serviceCenterId },
  });

  const [updateServiceCenterData] = useMutation(UPDATE_SERVICE_CENTER_DATA);
  const [updateServiceType] = useMutation(UPDATE_SERVICE_TYPE);
  const [cancelBookingById] = useMutation(CANCEL_BOOKING_BY_ID);
  const [confirmBookingById] = useMutation(CONFIRM_BOOKING_BY_ID);
  const [completeBookingById] = useMutation(COMPLETE_BOOKING_BY_ID);

  useEffect(() => {
    refetch(); // Refetch data when the page loads
  }, [refetch]);

  useEffect(() => {
    if (data) {
      if (data.getServiceCenterDataByServiceCenterId) {
        const {
          name,
          mobile,
          address,
          service_center_id,
          email,
          password,
          about,
          businesshours,
          imageurl, // Extract imageurl field
        } = data.getServiceCenterDataByServiceCenterId;
        setProfile({
          name,
          mobile,
          address,
          service_center_id,
          email,
          password,
          about,
          businesshours,
          imageurl, // Set imageurl field
        });
      } else {
        console.warn(
          "getServiceCenterDataByServiceCenterId returned null. Check the ID or server data."
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (serviceTypesData) {
      const {
        basic_price,
        half_service_price,
        full_service_price,
        comprehensive_price,
      } = serviceTypesData.getServiceTypesByServiceCenterId;

      const fetchedServices = [
        {
          name: "Basic / Minor / Interim Service",
          price: basic_price,
          selected: true,
        },
        {
          name: "Half Service / Medium Service",
          price: half_service_price,
          selected: true,
        },
        {
          name: "Full Service / Major Service",
          price: full_service_price,
          selected: true,
        },
        {
          name: "Comprehensive / Engine Tune-up Service",
          price: comprehensive_price,
          selected: true,
        },
      ];

      setServices(fetchedServices);
      setTempServices(fetchedServices);
    }
  }, [serviceTypesData]);

  const appointments = bookingsData?.getBookingsByServiceCenterId || [];

  const totalBookings = appointments.length;
  const completedBookings = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;
  const pendingBookings = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching service center data:", error);
    return <p>Error loading service center data. Please try again later.</p>;
  }

  if (serviceTypesLoading) return <p>Loading service types...</p>;
  if (serviceTypesError) {
    console.error("Error fetching service types:", serviceTypesError);
    return <p>Error loading service types. Please try again later.</p>;
  }

  if (bookingsLoading) return <p>Loading bookings...</p>;
  if (bookingsError) {
    console.error("Error fetching bookings:", bookingsError);
    return <p>Error loading bookings. Please try again later.</p>;
  }

  const handleRowClick = async (appointment) => {
    console.log("Clicked Appointment ID:", appointment.id); // Log the clicked ID
    try {
      await confirmBookingById({
        variables: { bookingId: appointment.id },
      });

      refetch(); // Refetch bookings after confirmation
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to confirm booking. Please try again.");
    }
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleAction = async (action) => {
    try {
      if (action === "Confirm" && selectedAppointment) {
        await confirmBookingById({
          variables: { bookingId: selectedAppointment.id },
        });
        toast.success("Booking confirmed successfully!");
        refetch(); // Refetch bookings after confirmation
      } else if (action === "Cancel" && selectedAppointment) {
        await cancelBookingById({
          variables: { bookingId: selectedAppointment.id },
        });
        toast.success("Booking cancelled successfully!");
        refetch(); // Refetch bookings after cancellation
      } else if (action === "Completed" && selectedAppointment) {
        await completeBookingById({
          variables: { bookingId: selectedAppointment.id },
        });
        toast.success("Booking marked as completed successfully!");
        refetch(); // Refetch bookings after marking as completed
      }
      refetch(); // Ensure refetch is called after any action
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Error performing action:", error);
      toast.error("Failed to perform action. Please try again.");
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const updatedFields = {};
      Object.keys(tempProfile).forEach((key) => {
        if (tempProfile[key] && tempProfile[key] !== profile[key]) {
          updatedFields[key] = tempProfile[key];
        }
      });

      if (Object.keys(updatedFields).length > 0) {
        await updateServiceCenterData({
          variables: {
            service_center_id: profile.service_center_id,
            ...updatedFields,
          },
        });
        await refetch(); // Refetch data after updating
        setProfile((prevProfile) => ({ ...prevProfile, ...updatedFields }));
        toast.success("Profile updated successfully!"); // Success toast
      }
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error updating service center data:", error);
      toast.error("Failed to update profile. Please try again."); // Error toast
    }
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditingProfile(false);
    toast.info("Profile edit canceled."); // Info toast
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...tempServices];
    updatedServices[index][field] = value;
    setTempServices(updatedServices);
  };

  const handleSaveServices = async () => {
    try {
      // Convert price values to integers
      const updatedPrices = {
        basic_price: parseInt(tempServices[0]?.price, 10) || 0,
        half_service_price: parseInt(tempServices[1]?.price, 10) || 0,
        full_service_price: parseInt(tempServices[2]?.price, 10) || 0,
        comprehensive_price: parseInt(tempServices[3]?.price, 10) || 0,
      };

      console.log("Updating service prices with variables:", {
        service_center_id: serviceCenterId,
        ...updatedPrices,
      });

      // Execute mutation
      const response = await updateServiceType({
        variables: {
          service_center_id: serviceCenterId,
          ...updatedPrices,
        },
      });

      console.log("Mutation response:", response);
      toast.success("Service prices updated successfully!");
      setServices(tempServices);
      setIsEditingServices(false);

      // Show success toast
    } catch (error) {
      console.error("Error updating service prices:", error);
      toast.error("Failed to update service prices. Please try again.");
    }
  };

  const handleCancelServicesEdit = () => {
    setTempServices(services);
    setIsEditingServices(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <div className={styles.tableContainer}>
            <h2>Recent Appointments</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Mobile</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    onClick={() => handleRowClick(appointment)}
                    className={styles.tableRow}
                  >
                    <td>{appointment.id}</td>
                    <td>{appointment.customer?.name || "N/A"}</td>
                    <td>{appointment.customer?.mobile || "N/A"}</td>
                    <td>{appointment.serviceType}</td>
                    <td>{appointment.date}</td>
                    <td
                      className={
                        appointment.status === "Confirmed"
                          ? styles.statusConfirmed
                          : appointment.status === "Pending"
                          ? styles.statusPending
                          : appointment.status === "Completed"
                          ? styles.statusCompleted
                          : styles.statusCancelled // Add cancelled status styling
                      }
                    >
                      {appointment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "profile":
        return (
          <div className={styles.profileContainer}>
            <h2 className={styles.sectionTitle}>Service Center Profile</h2>
            <div className={styles.profileCard}>
              {Object.keys(profile).map(
                (key) =>
                  key !== "service_center_id" && (
                    <div key={key} className={styles.profileField}>
                      <label className={styles.profileLabel}>
                        {key.replace(/_/g, " ").toUpperCase()}:
                      </label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          name={key}
                          value={tempProfile[key] || profile[key]} // Show previously entered data
                          placeholder={`Please enter your ${key.replace(
                            /_/g,
                            " "
                          )}`}
                          onChange={handleProfileChange}
                          className={styles.profileInput}
                        />
                      ) : (
                        <div className={styles.profileValue}>
                          {profile[key] ||
                            `Please enter your ${key.replace(/_/g, " ")}`}
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>
            <div className={styles.buttonGroup}>
              {isEditingProfile ? (
                <>
                  <button
                    className={styles.saveButton}
                    onClick={handleSaveProfile}
                  >
                    Save
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditingProfile(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className={styles.serviceTypesContainer}>
              <h2 className={styles.sectionTitle}>Service Types & Prices</h2>
              <ul className={styles.serviceTypeList}>
                {tempServices.map((service, index) => (
                  <li key={index} className={styles.serviceTypeItem}>
                    <div className={styles.serviceTypeName}>{service.name}</div>
                    {isEditingServices ? (
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) =>
                          handleServiceChange(index, "price", e.target.value)
                        }
                        className={styles.serviceTypeInput}
                      />
                    ) : (
                      <div className={styles.serviceTypePrice}>
                        Rs. {service.price}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className={styles.serviceButtonGroup}>
                {isEditingServices ? (
                  <>
                    <button
                      className={styles.saveButton}
                      onClick={handleSaveServices}
                    >
                      Save
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={handleCancelServicesEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.editButton}
                    onClick={() => setIsEditingServices(true)}
                  >
                    Edit Services
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Toaster />
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <p>Total Bookings</p>
          <h2>{totalBookings}</h2>
        </div>
        <div className={styles.statCard}>
          <p>Completed Bookings</p>
          <h2>{completedBookings}</h2>
        </div>
        <div className={styles.statCard}>
          <p>Pending Bookings</p>
          <h2>{pendingBookings}</h2>
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
          className={activeTab === "profile" ? styles.activeTab : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>
      {renderContent()}
      {selectedAppointment && activeTab === "appointments" && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Appointment Details</h2>
            <p>
              <strong>ID:</strong> {selectedAppointment.id}
            </p>
            <p>
              <strong>Customer:</strong>{" "}
              {selectedAppointment.customer?.name || "N/A"}
            </p>
            <p>
              <strong>Mobile:</strong>{" "}
              {selectedAppointment.customer?.mobile || "N/A"}
            </p>
            <p>
              <strong>Service:</strong> {selectedAppointment.serviceType}
            </p>
            <p>
              <strong>Date:</strong> {selectedAppointment.date}
            </p>
            <p>
              <strong>Price:</strong> Rs. {selectedAppointment.price || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {selectedAppointment.status}
            </p>
            <div className={styles.modalActions}>
              {selectedAppointment.status === "Pending" && (
                <>
                  <button
                    className={styles.confirmButton}
                    onClick={() => handleAction("Confirm")}
                  >
                    Confirm
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => handleAction("Cancel")}
                  >
                    Cancel
                  </button>
                </>
              )}
              {selectedAppointment.status === "Confirmed" && (
                <>
                  <button
                    className={styles.completedButton}
                    onClick={() => handleAction("Completed")}
                  >
                    Completed
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => handleAction("Cancel")}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCenterDashboard;
