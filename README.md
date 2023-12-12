# Hospital Management System API

## Overview

The Hospital Management System API is designed to streamline and automate various processes within a hospital. It provides a set of endpoints for managing patients, doctors, appointments, medical records, billing, inventory, and more.

## Table of Contents

- [Postman Collection](#postman-collection)
- [Features](#features)

Explore the [Postman Collection](https://www.postman.com/mission-cosmonaut-25659827/workspace/hospital-management-system/collection/26177748-a6d0931e-aedb-4705-b512-ac3b82b8deac?action=share&creator=26177748&active-environment=26177748-3ce1cd9f-9369-4f47-9452-3031bf2a353c) for easy integration and testing.

## Features

1. **User Management:**

   - Sign up, login, and password management for patients and doctors.
   - Authorization and access control for protected routes.

2. **Patient Management:**

   - Create, update, and delete patient records.
   - Retrieve a list of patients (available to doctors only).

3. **Doctor Management:**

   - Create and manage doctor profiles.
   - Retrieve a list of doctors.

4. **Appointment Scheduling:**

   - Schedule, cancel, and reschedule appointments.
   - Get appointment details.

5. **Medical Records:**

   - Create, update, and delete medical records.
   - View medical records for patients and doctors.

6. **Availability Schedule:**

   - Create and manage availability schedules for doctors.
   - View availability schedules for a specific doctor.

7. **Billing:**

   - Create billing records.
   - Generate billing reports (available to doctors only).
   - View billing details.

8. **Inventory Management:**
   - Create, update, and delete inventory items.
   - View all inventory items and those expiring soon (available to doctors only).

## Getting Started

1. **Installation:**

   - Clone the repository.
   - Install dependencies using `npm install`.

2. **Configuration:**

   - Set up your database configuration in `DB/DBConnection.js`.
   - Adjust any other configuration parameters in the respective files.

3. **Run the API:**

   - Use `npm start` to run the API.
   - Access the API at `http://localhost:3000` (or your configured port).

4. **API Documentation:**
   - Explore the API endpoints using the provided documentation in the `Documentation` folder.

## Contributing

Contributions are welcome! If you find issues or have suggestions, please create a new issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

GitHub : [Ahmed Sayed](https://github.com/unRealAhmed)
