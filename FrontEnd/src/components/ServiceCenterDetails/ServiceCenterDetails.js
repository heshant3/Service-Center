import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import styles from "./ServiceCenterDetails.module.css";

const GET_ALL_SERVICE_CENTER_DETAILS_BY_ID = gql`
  query GetAllServiceCenterDetailsByServiceCenterId($id: ID!) {
    getAllServiceCenterDetailsByServiceCenterId(id: $id) {
      id
      name
      address
      mobile
      email
      about
      businesshours
      imageurl
      serviceTypes {
        basic_price
        half_service_price
        full_service_price
        comprehensive_price
      }
    }
  }
`;

const ADD_BOOKING = gql`
  mutation AddBooking(
    $customerId: ID!
    $serviceCenterId: ID!
    $serviceType: String!
    $date: String!
    $time: String!
    $price: Float!
    $status: String!
  ) {
    addBooking(
      customerId: $customerId
      serviceCenterId: $serviceCenterId
      serviceType: $serviceType
      date: $date
      time: $time
      price: $price
      status: $status
    ) {
      id
      customerId
      serviceCenterId
      serviceType
      date
      time
      price
      status
    }
  }
`;

const ServiceCenterDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(
    GET_ALL_SERVICE_CENTER_DETAILS_BY_ID,
    {
      variables: { id },
    }
  );

  const [addBooking] = useMutation(ADD_BOOKING);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService("");
    setDate("");
    setTime("");
    setPrice(null);
  };

  const handleServiceChange = (e) => {
    const service = e.target.value;
    setSelectedService(service);

    // Update price based on selected service
    const servicePrices =
      data?.getAllServiceCenterDetailsByServiceCenterId.serviceTypes[0];
    if (service === "Basic Service") setPrice(servicePrices.basic_price);
    else if (service === "Half Service")
      setPrice(servicePrices.half_service_price);
    else if (service === "Full Service")
      setPrice(servicePrices.full_service_price);
    else if (service === "Comprehensive Service")
      setPrice(servicePrices.comprehensive_price);
    else setPrice(null);
  };

  const handleConfirmBooking = async () => {
    const customerId = parseInt(localStorage.getItem("customerId"), 10); // Parse customer ID as integer
    const serviceCenterId = parseInt(center.id, 10); // Parse service center ID as integer

    const bookingData = {
      customerId: customerId,
      serviceCenterId: serviceCenterId,
      serviceType: selectedService,
      date: date,
      time: time,
      price: price,
      status: "pending",
    };
    console.log(bookingData);
    try {
      const { data } = await addBooking({ variables: bookingData });
      console.log("Booking Data:", data.addBooking); // Log the booking data to the console
      alert("Booking Confirmed!");
      handleCloseModal();
    } catch (error) {
      console.error("Error adding booking:", error);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  const isFormValid = selectedService && date && time;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading service center details.</p>;

  const center = data?.getAllServiceCenterDetailsByServiceCenterId;

  if (!center) {
    return <p>No service center details found.</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsContent}>
        <div className={styles.imageSection}>
          {center.imageurl ? (
            <img src={center.imageurl} alt={`${center.name} image`} />
          ) : (
            <div className={styles.imagePlaceholder}>No Image</div>
          )}
        </div>
        <div className={styles.infoSection}>
          <h2>{center.name}</h2>
          <p>{center.address}</p>
          <p>{center.about}</p>
          <div className={styles.businessInfo}>
            <p>
              <strong>Business Hours</strong>
              <br />
              {center.businesshours}
            </p>
            <p>
              <strong>Contact</strong>
              <br />
              {center.mobile}
              <br />
              {center.email}
            </p>
          </div>
        </div>
        <div className={styles.bookingSection}>
          <h2>Book an Appointment</h2>
          <button className={styles.bookButton} onClick={handleOpenModal}>
            Book Now
          </button>
          {price && (
            <div className={styles.priceDisplay}>
              Selected Service Price: Rs. {price}
            </div>
          )}
          <div className={styles.bookingInfo}>
            <h3>Why book with AutoServe Hub?</h3>
            <ul>
              <li>Instant confirmation</li>
              <li>Transparent pricing</li>
              <li>Free cancellation 24h in advance</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.pricingSection}>
        <h2>Service Pricing</h2>
        <table className={styles.pricingTable}>
          <thead>
            <tr>
              <th>Service Type</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Service</td>
              <td>{center.serviceTypes[0].basic_price}</td>
            </tr>
            <tr>
              <td>Half Service</td>
              <td>{center.serviceTypes[0].half_service_price}</td>
            </tr>
            <tr>
              <td>Full Service</td>
              <td>{center.serviceTypes[0].full_service_price}</td>
            </tr>
            <tr>
              <td>Comprehensive Service</td>
              <td>{center.serviceTypes[0].comprehensive_price}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Book Service at {center.name}</h2>
            <label>Select Service</label>
            <select value={selectedService} onChange={handleServiceChange}>
              <option value="">Select Service</option>
              <option value="Basic Service">Basic Service</option>
              <option value="Half Service">Half Service</option>
              <option value="Full Service">Full Service</option>
              <option value="Comprehensive Service">
                Comprehensive Service
              </option>
            </select>

            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            {price && <p>Price: Rs.{price}</p>}
            <div className={styles.modalActions}>
              <button onClick={handleCloseModal}>Cancel</button>
              <button
                className={styles.confirmButton}
                disabled={!isFormValid}
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCenterDetails;
