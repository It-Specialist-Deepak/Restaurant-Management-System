const express = require('express');
const router = express.Router();

const { placeOrder } = require("../controllers/orderController");

router.post('/placeorder', placeOrder);

module.exports = router;