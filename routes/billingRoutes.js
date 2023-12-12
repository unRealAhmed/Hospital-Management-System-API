const express = require('express');
const {
  createBilling,
  getBillingDetails,
  updateBilling,
  deleteBilling,
  generateReport
} = require('../controllers/billingsController');
const { protect, restrictTo } = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/report', restrictTo('doctor'), generateReport);

router.get('/:billId', getBillingDetails);
router.post('/', restrictTo('doctor'), createBilling);
router.put('/:billId', restrictTo('doctor'), updateBilling);
router.delete('/:billId', restrictTo('doctor'), deleteBilling);

module.exports = router;
