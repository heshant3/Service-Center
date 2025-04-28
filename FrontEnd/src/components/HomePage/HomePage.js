import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { FaSearch } from "react-icons/fa"; // Import search icon
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

  useEffect(() => {
    if (data && data.getAllServiceCenterDetails) {
      setServiceCenters(data.getAllServiceCenterDetails.serviceCenterDetails);
    }
  }, [data]);

  const handleViewDetails = (service_center_id) => {
    navigate(`/service-center-details/${service_center_id}`);
  };

  const filteredServiceCenters = serviceCenters.filter((center) =>
    center.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading service centers.</p>;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.searchSection}>
        <h1 className={styles.searchTitle}>Find the Best Service Centers</h1>
        <p className={styles.searchSubtitle}>
          Search and explore top-rated service centers near you
        </p>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by address or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className={styles.serviceCards}>
        {filteredServiceCenters.map((center, index) => (
          <div key={index} className={styles.card}>
            <img
              src={center.imageurl}
              alt={`${center.name} image`}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{center.name}</h3>
              <p className={styles.cardAddress}>
                <i className="fas fa-map-marker-alt"></i> {center.address}
              </p>
              <p className={styles.cardAbout}>{center.about}</p>
              <div className={styles.cardRating}>
                <span>⭐ {center.averageRating || "N/A"}</span>
                <span>({center.totalReviews || 0})</span>
              </div>
              <p className={styles.businessHours}>
                <i className="fas fa-clock"></i> {center.businesshours}
              </p>
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
    </div>
  );
};

export default HomePage;
