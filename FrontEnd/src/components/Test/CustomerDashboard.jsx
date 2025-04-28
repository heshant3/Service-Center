import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Check, Plus, Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import styles from "./CustomerDashboard.module.css";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const stats = [
    {
      title: "Total Appointments",
      value: "1",
      icon: <Calendar className={styles.statsIcon} />,
    },
    {
      title: "Upcoming Appointments",
      value: "1",
      icon: <Clock className={styles.statsIcon} />,
    },
    {
      title: "Completed Services",
      value: "0",
      icon: <Check className={styles.statsIcon} />,
    },
    {
      title: "Total Spending",
      value: "$0",
      icon: <Clock className={styles.statsIcon} />,
    },
  ];

  const appointments = [
    {
      id: 1,
      centerName: "Homagama Car Hub",
      service: "Basic Service",
      date: "2025-04-27",
      time: "21:06:00",
      status: "pending",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} className={styles.statsCard}>
            <div className={styles.statsContent}>
              {stat.icon}
              <div className={styles.statsText}>
                <h3>{stat.title}</h3>
                <p className={styles.statsValue}>{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button className={styles.bookButton}>
        <Plus size={20} />
        Book New Appointment
      </Button>

      <div className={styles.appointmentsSection}>
        <h2>Your Appointments</h2>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "upcoming" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "past" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "cancelled" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
          </button>
        </div>

        <div className={styles.appointmentsList}>
          {appointments.map((appointment) => (
            <Card key={appointment.id} className={styles.appointmentCard}>
              <div className={styles.appointmentHeader}>
                <h3>{appointment.centerName}</h3>
                <Badge variant="secondary" className={styles.statusBadge}>
                  {appointment.status}
                </Badge>
              </div>
              <p className={styles.serviceType}>{appointment.service}</p>
              <div className={styles.appointmentDate}>
                <Calendar size={16} />
                <span>
                  Date: {appointment.date} at {appointment.time}
                </span>
              </div>
              <div className={styles.appointmentActions}>
                <Button variant="outline" className={styles.viewButton}>
                  <Eye size={16} />
                  View Details
                </Button>
                <Button variant="destructive" className={styles.cancelButton}>
                  <X size={16} />
                  Cancel
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
