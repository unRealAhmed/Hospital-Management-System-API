const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { v1: uuidv1 } = require('uuid');
const Billing = require('../models/Billing');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');
const Patient = require('../models/Patient');

const templatePath = path.join(__dirname, '..', 'templates', 'bill-template.hbs');
const templateContent = fs.readFileSync(templatePath, 'utf-8');
const compiledTemplate = handlebars.compile(templateContent);

exports.createBilling = asyncHandler(async (req, res, next) => {
  const { totalAmount, paymentStatus, patientId } = req.body;

  const billing = await Billing.create({
    totalAmount,
    paymentStatus,
    patientId,
  });

  res.status(201).json({
    success: true,
    message: 'Billing record created successfully.',
    data: billing,
  });
});

exports.getBillingDetails = asyncHandler(async (req, res, next) => {
  const { billId } = req.params;

  const billing = await Billing.findByPk(billId, {
    include: [{ model: Patient }],
  });

  if (!billing) {
    return next(new AppError('Billing record not found.', 404));
  }

  res.status(200).json({
    success: true,
    data: billing,
  });
});

exports.updateBilling = asyncHandler(async (req, res, next) => {
  const { billId } = req.params;
  const { totalAmount, paymentStatus } = req.body;

  const billing = await Billing.findByPk(billId);

  if (!billing) {
    return next(new AppError('Billing record not found.', 404));
  }

  billing.totalAmount = totalAmount;
  billing.paymentStatus = paymentStatus;

  await billing.save();

  res.status(200).json({
    success: true,
    message: 'Billing record updated successfully.',
    data: billing,
  });
});

exports.deleteBilling = asyncHandler(async (req, res, next) => {
  const { billId } = req.params;

  const billing = await Billing.findByPk(billId);

  if (!billing) {
    return next(new AppError('Billing record not found.', 404));
  }

  await billing.destroy();

  res.status(204).json({
    success: true,
    message: 'Billing record deleted successfully.',
    data: {},
  });
});


exports.generateReport = asyncHandler(async (req, res, next) => {
  const { patientId } = req.body;

  const billing = await Billing.findOne({
    where: { patientId },
    attributes: ['totalAmount', 'paymentStatus'],
  });

  if (!billing) {
    return next(new AppError('Billing record not found for the specified patient.', 404));
  }

  const generatedUUID = uuidv1();

  const pdfPath = path.join(__dirname, '..', 'pdf', `${generatedUUID}.pdf`);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const htmlContent = compiledTemplate(billing.toJSON());

  await page.setContent(htmlContent);
  await page.pdf({ path: pdfPath, format: 'A4' });

  await browser.close();

  const pdfData = fs.readFileSync(pdfPath);

  const storagePath = path.join(__dirname, '..', 'pdf', `${generatedUUID}.pdf`);
  fs.writeFileSync(storagePath, pdfData);

  return res.status(200).json({ uuid: generatedUUID, pdfPath: storagePath });
});
