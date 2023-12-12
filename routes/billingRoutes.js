const express = require('express');
const billingValidation = require('../validation/billingValidation');

const {
  createBilling,
  getBillingDetails,
  updateBilling,
  deleteBilling,
  generateReport
} = require('../controllers/billingsController');
const { protect, restrictTo } = require('../controllers/userController');
const validationFunction = require('../middleware/validationFunction');

const router = express.Router();

router.use(protect);

router.post('/', validationFunction(billingValidation), restrictTo('doctor'), createBilling);

// Restricted to 'doctor' routes
router.use(restrictTo('doctor'));

router.get('/report', generateReport);
router.get('/:billId', getBillingDetails);
router.put('/:billId', updateBilling);
router.delete('/:billId', deleteBilling);

module.exports = router;
