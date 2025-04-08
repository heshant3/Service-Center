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
      about
      businessHours
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
    $businessHours: String
  ) {
    updateServiceCenterData(
      service_center_id: $service_center_id
      name: $name
      mobile: $mobile
      address: $address
      email: $email
      password: $password
      about: $about
      businessHours: $businessHours
    ) {
      id
      name
      mobile
      address
      service_center_id
      about
      businessHours
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
    about: "", // Add about field
    businessHours: "", // Add businessHours field
  });
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const [isEditingServices, setIsEditingServices] = useState(false);
  const [services, setServices] = useState([]);
  const [tempServices, setTempServices] = useState([]);

  const appointments = [
    {
      id: 1,
      customer: "John Doe",
      service: "Oil Change",
      date: "2025-04-15",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Jane Smith",
      service: "Tire Rotation",
      date: "2025-04-16",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      service: "Brake Check",
      date: "2025-04-17",
      status: "Completed",
    },
  ];

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

  const [updateServiceCenterData] = useMutation(UPDATE_SERVICE_CENTER_DATA);
  const [updateServiceType] = useMutation(UPDATE_SERVICE_TYPE);

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
          businessHours,
        } = data.getServiceCenterDataByServiceCenterId;
        setProfile({
          name,
          mobile,
          address,
          service_center_id,
          email,
          password,
          about, // Set about field
          businessHours, // Set businessHours field
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

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleAction = (action) => {
    console.log(
      `${action} action for appointment ID: ${selectedAppointment.id}`
    );
    setSelectedAppointment(null);
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
            {" "}
            <h2>Recent Appointments</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
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
                    <td>{appointment.customer}</td>
                    <td>{appointment.service}</td>
                    <td>{appointment.date}</td>
                    <td
                      className={
                        appointment.status === "Confirmed"
                          ? styles.statusConfirmed
                          : appointment.status === "Pending"
                          ? styles.statusPending
                          : styles.statusCompleted
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
            <h2>Service Center Profile</h2>
            {isEditingProfile ? (
              <>
                <p>
                  <strong>Center Name:</strong>{" "}
                  <input
                    type="text"
                    name="name"
                    value={tempProfile.name}
                    placeholder={profile.name}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  <input
                    type="text"
                    name="address"
                    value={tempProfile.address}
                    placeholder={profile.address}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Mobile:</strong>{" "}
                  <input
                    type="text"
                    name="mobile"
                    value={tempProfile.mobile}
                    placeholder={profile.mobile}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <input
                    type="text"
                    name="email"
                    value={tempProfile.email}
                    placeholder={profile.email}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Password:</strong>{" "}
                  <input
                    type="text"
                    name="password"
                    value={tempProfile.password}
                    placeholder="********"
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>About:</strong>{" "}
                  <textarea
                    name="about"
                    value={tempProfile.about}
                    placeholder={profile.about}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Business Hours:</strong>{" "}
                  <input
                    type="text"
                    name="businessHours"
                    value={tempProfile.businessHours}
                    placeholder={profile.businessHours}
                    onChange={handleProfileChange}
                  />
                </p>
                <div className={styles.buttonGroup}>
                  <button onClick={handleSaveProfile}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Center Name:</strong> {profile.name}
                </p>
                <p>
                  <strong>Location:</strong> {profile.address}
                </p>
                <p>
                  <strong>Mobile:</strong> {profile.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Password:</strong> ********
                </p>
                <p>
                  <strong>About:</strong> {profile.about}
                </p>
                <p>
                  <strong>Business Hours:</strong> {profile.businessHours}
                </p>
                <button onClick={() => setIsEditingProfile(true)}>Edit</button>
              </>
            )}
            <h3>Service Types & Prices</h3>
            {isEditingServices ? (
              <>
                <ul>
                  {tempServices.map((service, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        checked={service.selected}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "selected",
                            e.target.checked
                          )
                        }
                      />{" "}
                      <input
                        type="text"
                        value={service.name}
                        readOnly
                        style={{ border: "none", background: "transparent" }}
                      />{" "}
                      Rs.
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) =>
                          handleServiceChange(index, "price", e.target.value)
                        }
                      />
                    </li>
                  ))}
                </ul>
                <div className={styles.buttonGroup}>
                  <button onClick={handleSaveServices}>Save</button>
                  <button onClick={handleCancelServicesEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <ul>
                  {services.map((service, index) => (
                    <li key={index}>
                      {service.name} - <strong>Rs. {service.price}</strong>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setIsEditingServices(true)}>Edit</button>
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
      <Toaster /> {/* Add Toaster component */}
      <h1>Service Center Dashboard</h1>
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
              <strong>Customer:</strong> {selectedAppointment.customer}
            </p>
            <p>
              <strong>Service:</strong> {selectedAppointment.service}
            </p>
            <p>
              <strong>Date:</strong> {selectedAppointment.date}
            </p>
            <p>
              <strong>Status:</strong> {selectedAppointment.status}
            </p>
            <div className={styles.modalActions}>
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
              <button
                className={styles.completedButton}
                onClick={() => handleAction("Completed")}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCenterDashboard;
