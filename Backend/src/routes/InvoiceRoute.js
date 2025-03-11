const express = require ("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyTokenMiddleware')
const userAuthMiddleware = require('../middleware/userAuthMiddleware');
const { downloadInvoice } = require('../controllers/InvoiceController');
router.post('/download-invoice', userAuthMiddleware, verifyToken, downloadInvoice);

module.exports = router;