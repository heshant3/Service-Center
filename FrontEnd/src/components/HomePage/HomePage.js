import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client"; // Import Apollo Client
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
        serviceTypes {
          id
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

  useEffect(() => {
    if (data && data.getAllServiceCenterDetails) {
      setServiceCenters(data.getAllServiceCenterDetails.serviceCenterDetails);
    }
  }, [data]);

  const handleViewDetails = (service_center_id) => {
    navigate(`/service-center-details/${service_center_id}`);
  };

  console.log("Service Centers:", serviceCenters);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading service centers.</p>;

  return (
    <div className={styles.homeContainer}>
      <h1>Find Service Centers</h1>
      <div className={styles.serviceCards}>
        {serviceCenters.map((center, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => handleViewDetails(center.id)}
          >
            <img src={center.imageurl} alt={`${center.name} image`} />
            <h3>{center.name}</h3>
            <p>{center.address}</p>
            <p>{center.about}</p>
            <button className={styles.detailsButton}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
