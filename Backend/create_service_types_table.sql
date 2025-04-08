DROP TABLE IF EXISTS service_types;

CREATE TABLE service_types (
  id SERIAL PRIMARY KEY,
  service_center_id INT NOT NULL,
  basic_price INT NOT NULL,
  half_service_price INT NOT NULL,
  full_service_price INT NOT NULL,
  comprehensive_price INT NOT NULL,
  FOREIGN KEY (service_center_id) REFERENCES serviceCentersData(service_center_id) ON DELETE CASCADE
);
