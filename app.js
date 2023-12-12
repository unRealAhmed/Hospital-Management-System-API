require('dotenv').config({ path: './config.env' })
const express = require('express')
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
require('./DB/DBConnection')
// require('./DB/DBSync')
const errorController = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const patientRouter = require('./routes/patientRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const appointmentRouter = require('./routes/appointmentRoutes');
const availabilityScheduleRouter = require('./routes/availabilityScheduleRoutes');
const billingRouter = require('./routes/billingRoutes');
const medicalRecordsRouter = require('./routes/medicalRecordsRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');

//Middlewares

const app = express()
app.use(helmet()); // Set various HTTP headers for security
app.use(xss()); // Prevent XSS attacks
app.use(hpp());
app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
}));

//ROUTES

app.use('/users', userRouter)
app.use('/patients', patientRouter)
app.use('/doctors', doctorRouter)
app.use('/appointments', appointmentRouter)
app.use('/availability-schedules', availabilityScheduleRouter)
app.use('/billings', billingRouter)
app.use('/medical-records', medicalRecordsRouter)
app.use('/inventory', inventoryRouter)

// Error Handling Middleware: Handle requests for undefined routes
app.all("*", (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});

// Error Controller: Handle errors generated during request processing
app.use(errorController);

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server Is Running On Port ${port}...👍`);
})
