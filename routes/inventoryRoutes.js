const express = require('express');
const {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  getExpiringSoonInventoryItems,
} = require('../controllers/inventoryController');
const { protect, restrictTo } = require('../controllers/userController');

const router = express.Router();

// doctor has access, admin in the future


router.route('/')
  .get(getAllInventoryItems)
  .post(protect, restrictTo('doctor'), createInventoryItem);

router.route('/expiring-soon')
  .get(protect, restrictTo('doctor'), getExpiringSoonInventoryItems);

router.route('/:itemId')
  .get(getInventoryItemById)
  .put(protect, restrictTo('doctor'), updateInventoryItem)
  .delete(protect, restrictTo('doctor'), deleteInventoryItem);

module.exports = router;
