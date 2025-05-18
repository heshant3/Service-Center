import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  FaSearch,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaFilter,
} from "react-icons/fa";
import styles from "./HomePage.module.css";

const GET_ALL_SERVICE_CENTER_DETAILS = gql`
  query GetAllServiceCenterDetails {
    getAllServiceCenterDetails {
      totalCount
      serviceCenterDetails {
        id
        name
        address
        mobile
        email
        about
        businesshours
        imageurl
        averageRating
        ratingCount
        serviceTypes {
          id
          service_center_id
          basic_price
          half_service_price
          full_service_price
          comprehensive_price
        }
      }
    }
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_SERVICE_CENTER_DETAILS);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (data && data.getAllServiceCenterDetails) {
      setServiceCenters(data.getAllServiceCenterDetails.serviceCenterDetails);
    }
  }, [data]);

  const handleViewDetails = (service_center_id) => {
    navigate(`/service-center-details/${service_center_id}`);
  };

  const filteredServiceCenters = serviceCenters.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating =
      selectedRating === "all" ||
      center.averageRating >= parseFloat(selectedRating);
    return matchesSearch && matchesRating;
  });

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading service centers...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.errorContainer}>
        <p>Error loading service centers. Please try again later.</p>
      </div>
    );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find Your Perfect Service Center</h1>
          <p className={styles.heroSubtitle}>
            Discover top-rated service centers near you with expert mechanics
            and quality service
          </p>
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button
                className={styles.filterButton}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> Filters
              </button>
            </div>
            {showFilters && (
              <div className={styles.filtersPanel}>
                <div className={styles.filterGroup}>
                  <label>Rating:</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.serviceCards}>
        {filteredServiceCenters.map((center, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardImageContainer}>
              <img
                src={center.imageurl}
                alt={center.name}
                className={styles.cardImage}
              />
              <div className={styles.ratingBadge}>
                <FaStar /> {center.averageRating?.toFixed(1) || "New"}
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{center.name}</h3>
              <div className={styles.cardInfo}>
                <p className={styles.cardAddress}>
                  <FaMapMarkerAlt /> {center.address}
                </p>
                <p className={styles.businessHours}>
                  <FaClock /> {center.businesshours}
                </p>
              </div>
              <p className={styles.cardAbout}>{center.about}</p>
              <div className={styles.serviceTags}>
                {center.serviceTypes.map((service) => (
                  <span key={service.id} className={styles.serviceTag}>
                    {service.name}
                  </span>
                ))}
              </div>
              <button
                className={styles.detailsButton}
                onClick={() => handleViewDetails(center.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServiceCenters.length === 0 && (
        <div className={styles.noResults}>
          <h3>No service centers found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
