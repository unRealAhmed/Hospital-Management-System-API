const express = require('express');
const inventoryValidation = require('../validation/inventoryValidation');

const {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  getExpiringSoonInventoryItems,
} = require('../controllers/inventoryController');
const { protect, restrictTo } = require('../controllers/userController');
const validationFunction = require('../middleware/validationFunction');

const router = express.Router();

// Doctor has access, admin in the future

router.post('/', protect, restrictTo('doctor'), validationFunction(inventoryValidation.createInventoryItem), createInventoryItem);

router.route('/')
  .get(getAllInventoryItems);

router.route('/expiring-soon')
  .get(protect, restrictTo('doctor'), getExpiringSoonInventoryItems);

router.route('/:itemId')
  .get(getInventoryItemById)
  .put(protect, restrictTo('doctor'), validationFunction(inventoryValidation.updateInventoryItem), updateInventoryItem)
  .delete(protect, restrictTo('doctor'), deleteInventoryItem);

module.exports = router;
