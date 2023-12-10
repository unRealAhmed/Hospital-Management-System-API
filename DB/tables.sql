-- Patient

CREATE TABLE Patients (
  patientId SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  gender VARCHAR(255) NOT NULL,
  contactInformation VARCHAR(255) NOT NULL,
  medicalHistory TEXT,
  appointmentId INTEGER REFERENCES Appointments(id),
  medicalRecordId INTEGER REFERENCES MedicalRecords(id),
  userId INTEGER REFERENCES Users(userId)
);


ALTER TABLE Patients
  ADD CONSTRAINT fk_patient_appointment FOREIGN KEY (appointmentId) REFERENCES Appointments(id);

ALTER TABLE Patients
  ADD CONSTRAINT fk_patient_medical_record FOREIGN KEY (medicalRecordId) REFERENCES MedicalRecords(id);

ALTER TABLE Patients
  ADD CONSTRAINT fk_patient_user FOREIGN KEY (userId) REFERENCES Users(userId);

--  Doctor

CREATE TABLE Doctors (
  doctorId SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  contactInformation VARCHAR(255) NOT NULL,
  appointmentId INTEGER REFERENCES Appointments(id),
  availabilityScheduleId INTEGER REFERENCES AvailabilitySchedules(id),
  userId INTEGER REFERENCES Users(userId)
);

ALTER TABLE Doctors
  ADD CONSTRAINT fk_doctor_appointment FOREIGN KEY (appointmentId) REFERENCES Appointments(id);

ALTER TABLE Doctors
  ADD CONSTRAINT fk_doctor_availability_schedule FOREIGN KEY (availabilityScheduleId) REFERENCES AvailabilitySchedules(id);

ALTER TABLE Doctors
  ADD CONSTRAINT fk_doctor_user FOREIGN KEY (userId) REFERENCES Users(userId);

-- User

CREATE TABLE Users (
  userId SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

ALTER TABLE Patients
  ADD CONSTRAINT fk_patient_user FOREIGN KEY (userId) REFERENCES Users(userId);

ALTER TABLE Doctors
  ADD CONSTRAINT fk_doctor_user FOREIGN KEY (userId) REFERENCES Users(userId);

-- Appoointment

CREATE TABLE Appointments (
  appointmentId SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status VARCHAR(255) NOT NULL,
  patientId INTEGER REFERENCES Patients(patientId),
  doctorId INTEGER REFERENCES Doctors(doctorId)
);

ALTER TABLE Appointments
  ADD CONSTRAINT fk_appointment_patient FOREIGN KEY (patientId) REFERENCES Patients(patientId);

ALTER TABLE Appointments
  ADD CONSTRAINT fk_appointment_doctor FOREIGN KEY (doctorId) REFERENCES Doctors(doctorId);

-- Medical Record

CREATE TABLE MedicalRecords (
  recordId SERIAL PRIMARY KEY,
  diagnosis TEXT NOT NULL,
  prescriptions TEXT,
  testResults TEXT,
  date DATEONLY NOT NULL,
  patientId INTEGER REFERENCES Patients(patientId),
  doctorId INTEGER REFERENCES Doctors(doctorId)
);

ALTER TABLE MedicalRecords
  ADD CONSTRAINT fk_medical_record_patient FOREIGN KEY (patientId) REFERENCES Patients(patientId);

ALTER TABLE MedicalRecords
  ADD CONSTRAINT fk_medical_record_doctor FOREIGN KEY (doctorId) REFERENCES Doctors(doctorId);

-- Billing

CREATE TABLE Billings (
  billId SERIAL PRIMARY KEY,
  totalAmount DECIMAL(10, 2) NOT NULL,
  paymentStatus VARCHAR(255) NOT NULL,
  patientId INTEGER REFERENCES Patients(patientId)
);

ALTER TABLE Billings
  ADD CONSTRAINT fk_billing_patient FOREIGN KEY (patientId) REFERENCES Patients(patientId);

-- Inventory

CREATE TABLE Inventories (
  itemId SERIAL PRIMARY KEY,
  itemName VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  expiryDate DATEONLY,
  supplierInformation TEXT
);

-- AvailabilitySchedule

CREATE TABLE AvailabilitySchedules (
  availabilityId SERIAL PRIMARY KEY,
  day VARCHAR(255) NOT NULL,
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  doctorId INTEGER REFERENCES Doctors(doctorId)
);

ALTER TABLE AvailabilitySchedules
  ADD CONSTRAINT fk_availability_schedule_doctor FOREIGN KEY (doctorId) REFERENCES Doctors(doctorId);
