import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client"; // Import Apollo Client hooks
import styles from "./AdminDashboard.module.css";

// Define the GraphQL queries
const SHOW_ALL_BOOKINGS = gql`
  query ShowAllBookings {
    showAllBookings {
      totalCount
      bookings {
        id
        customerId
        serviceCenterId
        serviceType
        date
        time
        price
        status
        computedPart
      }
    }
  }
`;

const GET_ALL_SERVICE_CENTER_DETAILS = gql`
  query {
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

const GET_ALL_CUSTOMER_DETAILS = gql`
  query {
    getAllCustomerDetails {
      totalCount
      customerDetails {
        id
        name
        mobile
        address
        email
      }
    }
  }
`;

const AdminDashboard = () => {
  // Use the queries to fetch data
  const { data, loading, error } = useQuery(SHOW_ALL_BOOKINGS);
  const {
    data: serviceCenterData,
    loading: serviceCenterLoading,
    error: serviceCenterError,
  } = useQuery(GET_ALL_SERVICE_CENTER_DETAILS);
  const {
    data: customerData,
    loading: customerLoading,
    error: customerError,
  } = useQuery(GET_ALL_CUSTOMER_DETAILS);

  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Fetched Bookings Data:", data.showAllBookings);
      // Set default table data to bookings
      setTableHeaders([
        "ID",
        "Customer ID",
        "Service Center ID",
        "Service Type",
        "Date",
        "Time",
        "Price",
        "Status",
      ]);
      setTableData(
        data.showAllBookings.bookings.map((booking) => [
          booking.id,
          booking.customerId,
          booking.serviceCenterId,
          booking.serviceType,
          booking.date,
          booking.time,
          booking.price,
          booking.status,
        ])
      );
    }
  }, [data]);

  useEffect(() => {
    if (serviceCenterData) {
      console.log(
        "Fetched Service Center Details:",
        serviceCenterData.getAllServiceCenterDetails
      );
    }
  }, [serviceCenterData]);

  useEffect(() => {
    if (customerData) {
      console.log(
        "Fetched Customer Details:",
        customerData.getAllCustomerDetails
      );
    }
  }, [customerData]);

  const handleServiceCardClick = () => {
    if (serviceCenterData) {
      console.log(
        "Total Service Centers:",
        serviceCenterData.getAllServiceCenterDetails.totalCount
      );
      setTableHeaders(["ID", "Name", "Address", "Mobile", "Email", "About"]);
      setTableData(
        serviceCenterData.getAllServiceCenterDetails.serviceCenterDetails.map(
          (center) => [
            center.id,
            center.name,
            center.address,
            center.mobile,
            center.email,
            center.about,
          ]
        )
      );
    } else {
      console.log("Service Center data is not available.");
    }
  };

  const handleBookingCardClick = () => {
    if (data) {
      console.log("Total Bookings:", data.showAllBookings.totalCount);
      setTableHeaders([
        "ID",
        "Customer ID",
        "Service Center ID",
        "Service Type",
        "Date",
        "Time",
        "Price",
        "Status",
      ]);
      setTableData(
        data.showAllBookings.bookings.map((booking) => [
          booking.id,
          booking.customerId,
          booking.serviceCenterId,
          booking.serviceType,
          booking.date,
          booking.time,
          booking.price,
          booking.status,
        ])
      );
    } else {
      console.log("Booking data is not available.");
    }
  };

  const handleCustomerCardClick = () => {
    if (customerData) {
      console.log(
        "Total Customers:",
        customerData.getAllCustomerDetails.totalCount
      );
      setTableHeaders(["ID", "Name", "Mobile", "Address", "Email"]);
      setTableData(
        customerData.getAllCustomerDetails.customerDetails.map((customer) => [
          customer.id,
          customer.name,
          customer.mobile,
          customer.address,
          customer.email,
        ])
      );
    } else {
      console.log("Customer data is not available.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings data.</p>;
  if (serviceCenterLoading) return <p>Loading service center details...</p>;
  if (serviceCenterError) return <p>Error loading service center details.</p>;
  if (customerLoading) return <p>Loading customer details...</p>;
  if (customerError) return <p>Error loading customer details.</p>;

  return (
    <div className={styles.dashboardContainer}>
      <h1>Admin Dashboard</h1>
      <div className={styles.stats}>
        <div className={styles.statCard} onClick={handleServiceCardClick}>
          <p>Service Centers</p>
          <h2>
            {serviceCenterData?.getAllServiceCenterDetails?.totalCount ||
              "Loading..."}
          </h2>
        </div>
        <div className={styles.statCard} onClick={handleCustomerCardClick}>
          <p>Customers</p>
          <h2>
            {customerData?.getAllCustomerDetails?.totalCount || "Loading..."}
          </h2>
        </div>
        <div className={styles.statCard} onClick={handleBookingCardClick}>
          <p>Total Bookings</p>
          <h2>{data?.showAllBookings?.totalCount || "Loading..."}</h2>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <h2>Details</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
