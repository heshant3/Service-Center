import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { toast, Toaster } from "sonner";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaCheck,
} from "react-icons/fa";
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

const GET_FEEDBACKS_BY_SERVICE_CENTER_ID = gql`
  query GetFeedbacksByServiceCenterId($serviceCenterId: ID!) {
    getFeedbacksByServiceCenterId(serviceCenterId: $serviceCenterId) {
      feedbacks {
        id
        customerName
        customerId
        serviceType
        feedback
        rating
      }
      averageRating
      ratingCount
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

  const { data: feedbackData } = useQuery(GET_FEEDBACKS_BY_SERVICE_CENTER_ID, {
    variables: { serviceCenterId: id },
  });

  const [addBooking] = useMutation(ADD_BOOKING);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(3); // State to track visible reviews

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

    try {
      await addBooking({ variables: bookingData }); // Removed unused `data`

      toast.success("Booking Confirmed!"); // Replaced alert with toast
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to confirm booking. Please try again."); // Replaced alert with toast
    }
  };

  const isFormValid = selectedService && date && time;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading service center details.</p>;

  const center = data?.getAllServiceCenterDetailsByServiceCenterId;

  if (!center) {
    return <p>No service center details found.</p>;
  }

  const handleShowMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3); // Show 3 more reviews
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.imageContainer}>
            {center.imageurl ? (
              <img
                src={center.imageurl}
                alt={center.name}
                className={styles.image}
              />
            ) : (
              <div className={styles.imagePlaceholder}>No Image</div>
            )}
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>{center.name}</h1>
              <div className={styles.location}>
                <FaMapMarkerAlt className={styles.locationIcon} />
                <span>{center.address}</span>
              </div>
              <div className={styles.rating}>
                <div className={styles.ratingScore}>
                  <span className={styles.score}>
                    {feedbackData?.getFeedbacksByServiceCenterId
                      .averageRating || 0}
                  </span>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i <
                          Math.round(
                            feedbackData?.getFeedbacksByServiceCenterId
                              .averageRating || 0
                          )
                            ? styles.starFilled
                            : styles.starEmpty
                        }
                      />
                    ))}
                  </div>
                </div>
                <span className={styles.reviews}>
                  Based on{" "}
                  {feedbackData?.getFeedbacksByServiceCenterId.ratingCount || 0}{" "}
                  reviews
                </span>
              </div>
              <p className={styles.description}>{center.about}</p>
            </div>
            <div className={styles.bookingSection}>
              <button className={styles.bookButton} onClick={handleOpenModal}>
                Book Now
              </button>
              <div className={styles.features}>
                <div className={styles.featureItem}>
                  <FaCheck className={styles.checkIcon} />
                  <span>Instant confirmation</span>
                </div>
                <div className={styles.featureItem}>
                  <FaCheck className={styles.checkIcon} />
                  <span>Transparent pricing</span>
                </div>
                <div className={styles.featureItem}>
                  <FaCheck className={styles.checkIcon} />
                  <span>Free cancellation 24h in advance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>
            <FaClock className={styles.infoIcon} />
            <span>Business Hours</span>
          </div>
          <div className={styles.infoContent}>{center.businesshours}</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>
            <FaPhone className={styles.infoIcon} />
            <span>Contact</span>
          </div>
          <div className={styles.infoContent}>
            <div className={styles.contactInfo}>
              <FaPhone className={styles.contactIcon} />
              {center.mobile}
            </div>
            <div className={styles.contactInfo}>
              <FaEnvelope className={styles.contactIcon} />
              {center.email}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>Service Pricing</h2>
        <div className={styles.pricingTable}>
          <div className={styles.pricingHeader}>
            <span>Service Type</span>
            <span>Price (Rs)</span>
          </div>
          {[
            {
              name: "Basic Service",
              price: center.serviceTypes[0].basic_price,
            },
            {
              name: "Half Service",
              price: center.serviceTypes[0].half_service_price,
            },
            {
              name: "Full Service",
              price: center.serviceTypes[0].full_service_price,
            },
            {
              name: "Comprehensive Service",
              price: center.serviceTypes[0].comprehensive_price,
            },
          ].map((service, index) => (
            <div key={index} className={styles.pricingRow}>
              <span>{service.name}</span>
              <span>Rs. {service.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Customer Reviews</h2>
        <div className={styles.reviewsContainer}>
          {feedbackData?.getFeedbacksByServiceCenterId.feedbacks
            .slice(0, visibleReviews)
            .map((feedback) => (
              <div key={feedback.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInitial}>
                    {feedback.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerName}>
                      {feedback.customerName}
                    </div>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < feedback.rating
                              ? styles.starFilled
                              : styles.starEmpty
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={styles.reviewText}>{feedback.feedback}</p>
                <div className={styles.reviewMeta}>
                  <span>{new Date().toLocaleDateString()}</span>
                  <span className={styles.serviceType}>
                    {feedback.serviceType}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {visibleReviews <
          feedbackData?.getFeedbacksByServiceCenterId.feedbacks.length && (
          <button
            className={styles.viewAllButton}
            onClick={handleShowMoreReviews}
          >
            Show More Reviews
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Book Service at {center.name}</h2>
            <div className={styles.formGroup}>
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
            </div>
            <div className={styles.formGroup}>
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            {price && (
              <div className={styles.priceDisplay}>
                <span>Total Price:</span>
                <span className={styles.price}>Rs. {price}</span>
              </div>
            )}
            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
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
