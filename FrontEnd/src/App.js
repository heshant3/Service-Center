import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import ServiceCenterDetails from "./components/ServiceCenterDetails/ServiceCenterDetails";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ServiceCenterDashboard from "./components/ServiceCenterDashboard/ServiceCenterDashboard";
import ApolloClientProvider from "./components/ApolloClientProvider/ApolloClientProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <ApolloClientProvider>
      <Router>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route
              path="/service-center-details"
              element={<ServiceCenterDetails />}
            />
            <Route
              path="/service-center-details/:id"
              element={<ServiceCenterDetails />}
            />
            <Route
              path="/customer-dashboard"
              element={
                <ProtectedRoute role="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service-center-dashboard"
              element={
                <ProtectedRoute role="serviceCenter">
                  <ServiceCenterDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ApolloClientProvider>
  );
}

export default App;
