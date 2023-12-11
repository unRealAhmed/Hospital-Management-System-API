-- Patient

CREATE TABLE Patients (
  patientId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT UNSIGNED NOT NULL,
  gender VARCHAR(255) NOT NULL,
  contactInformation VARCHAR(255) NOT NULL,
  medicalHistory TEXT,
  appointmentId INT UNSIGNED,
  medicalRecordId INT UNSIGNED,
  userId INT UNSIGNED,
  FOREIGN KEY (appointmentId) REFERENCES Appointments(appointmentId),
  FOREIGN KEY (medicalRecordId) REFERENCES MedicalRecords(recordId),
  FOREIGN KEY (userId) REFERENCES Users(userId)
);

 

-- Doctor

CREATE TABLE Doctors (
  doctorId INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  contactInformation VARCHAR(255) NOT NULL,
  appointmentId INT,
  availabilityScheduleId INT,
  userId INT,
  FOREIGN KEY (appointmentId) REFERENCES Appointments(appointmentId),
  FOREIGN KEY (availabilityScheduleId) REFERENCES AvailabilitySchedules(availabilityId),
  FOREIGN KEY (userId) REFERENCES Users(userId)
);

 

-- User

CREATE TABLE Users (
  userId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

 

-- Appointment

CREATE TABLE Appointments (
  appointmentId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status VARCHAR(255) NOT NULL,
  patientId INT UNSIGNED,
  doctorId INT UNSIGNED,
  FOREIGN KEY (patientId) REFERENCES Patients(patientId),
  FOREIGN KEY (doctorId) REFERENCES Doctors(doctorId)
);

 

-- Medical Record

CREATE TABLE MedicalRecords (
  recordId INT AUTO_INCREMENT PRIMARY KEY, 
  diagnosis TEXT NOT NULL,
  prescriptions TEXT,
  testResults TEXT,
  date DATE NOT NULL,
  patientId INT UNSIGNED,
  doctorId INT UNSIGNED,
  FOREIGN KEY (patientId) REFERENCES Patients(patientId),
  FOREIGN KEY (doctorId) REFERENCES Doctors(doctorId)
);

 

-- Billing

CREATE TABLE Billings (
  billId INT AUTO_INCREMENT PRIMARY KEY, 
  totalAmount DECIMAL(10, 2) NOT NULL,
  paymentStatus VARCHAR(255) NOT NULL,
  patientId INT UNSIGNED,
  FOREIGN KEY (patientId) REFERENCES Patients(patientId)
);

 

-- Inventory

CREATE TABLE Inventories (
  itemId INT AUTO_INCREMENT PRIMARY KEY, 
  itemName VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  expiryDate DATE,
  supplierInformation TEXT
);

-- AvailabilitySchedule

CREATE TABLE AvailabilitySchedules (
  availabilityId INT AUTO_INCREMENT PRIMARY KEY, 
  day VARCHAR(255) NOT NULL,
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  doctorId INT UNSIGNED,
  FOREIGN KEY (doctorId) REFERENCES Doctors(doctorId)
);


