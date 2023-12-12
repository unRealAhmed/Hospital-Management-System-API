const express = require('express');
const {
  signUp,
  login,
  forgetPassword,
  resetPassword,
  protect,
  updatePassword,
} = require('../controllers/userController');
const validationFunction = require('../middleware/validationFunction');
const userValidation = require('../validation/userValidation');

const router = express.Router();

router.post('/signup', validationFunction(userValidation), signUp);
router.post('/login', validationFunction(userValidation), login);
router.post('/forgetPassword', validationFunction(userValidation), forgetPassword);
router.patch('/resetPassword/:token', validationFunction(userValidation), resetPassword);

router.use(protect);

router.patch('/updatePassword', validationFunction(userValidation), updatePassword);

module.exports = router;
