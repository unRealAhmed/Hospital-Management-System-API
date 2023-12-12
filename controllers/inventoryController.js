const { Op } = require('sequelize');
const Inventory = require('../models/Inventory');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');


exports.createInventoryItem = asyncHandler(async (req, res) => {
  const { itemName, quantity, expiryDate, supplierInformation } = req.body;

  const inventoryItem = await Inventory.create({
    itemName,
    quantity,
    expiryDate,
    supplierInformation,
  });

  res.status(201).json({
    status: 'success',
    data: {
      inventoryItem,
    },
  });
});

exports.getAllInventoryItems = asyncHandler(async (req, res) => {
  const inventoryItems = await Inventory.findAll();

  res.status(200).json({
    status: 'success',
    data: {
      inventoryItems,
    },
  });
});

exports.getInventoryItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const inventoryItem = await Inventory.findByPk(itemId);

  if (!inventoryItem) {
    throw new AppError('Inventory item not found.', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      inventoryItem,
    },
  });
});

exports.updateInventoryItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { itemName, quantity, expiryDate, supplierInformation } = req.body;

  const inventoryItem = await Inventory.findByPk(itemId);

  if (!inventoryItem) {
    throw new AppError('Inventory item not found.', 404);
  }

  // Update inventory item attributes
  inventoryItem.itemName = itemName;
  inventoryItem.quantity = quantity;
  inventoryItem.expiryDate = expiryDate;
  inventoryItem.supplierInformation = supplierInformation;

  await inventoryItem.save();

  res.status(200).json({
    status: 'success',
    data: {
      inventoryItem,
    },
  });
});

exports.deleteInventoryItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const inventoryItem = await Inventory.findByPk(itemId);

  if (!inventoryItem) {
    throw new AppError('Inventory item not found.', 404);
  }

  await inventoryItem.destroy();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getExpiringSoonInventoryItems = asyncHandler(async (req, res) => {
  const currentDate = new Date();

  const expiringSoonItems = await Inventory.findAll({
    where: {
      expiryDate: {
        [Op.gte]: currentDate,
      },
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      expiringSoonItems,
    },
  });
});