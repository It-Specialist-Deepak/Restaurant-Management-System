const express = require('express');
const router = express.Router();

const { placeOrder , getOrder , cancelOrder } = require("../controllers/orderController");

router.post('/placeorder', placeOrder);
router.post("/getorder" , getOrder);
router.post("/cancelorder" , cancelOrder);

module.exports = router;