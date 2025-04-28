.dashboardContainer {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.statCard {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.statCard h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1f2c;
  margin: 0;
}

.statCard p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.tabs button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #64748b;
  font-weight: 500;
  position: relative;
}

.activeTab {
  color: #8b5cf6;
}

.activeTab::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #8b5cf6;
}

.appointmentsList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.appointment {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.appointment h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1f2c;
  margin: 0;
}

.appointment p {
  color: #64748b;
  margin: 0.5rem 0;
}

.statusBadge {
  text-transform: capitalize;
  background-color: #fef7cd;
  color: #854d0e;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.appointmentActions {
  display: flex;
  gap: 1rem;
}

.viewButton,
.cancelButton {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.viewButton {
  background-color: #e2e8f0;
  color: #1a1f2c;
}

.cancelButton {
  background-color: #fef7cd;
  color: #854d0e;
}

.footer {
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #666;
  text-align: center;
}

.popupOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popupCard {
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}