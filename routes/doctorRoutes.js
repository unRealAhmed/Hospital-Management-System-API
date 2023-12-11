const express = require('express');
const {
  createDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { protect, restrictTo } = require('../controllers/userController');

const router = express.Router();

router.post('/create/:userId', createDoctor);

router.get('/', getAllDoctors)
router.get('/:doctorId', getDoctor)

router.use(protect, restrictTo('doctor'))

router.route('/:doctorId')
  .patch(updateDoctor)
  .delete(deleteDoctor)

module.exports = router;
