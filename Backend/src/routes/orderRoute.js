const express = require("express");
const router = express.Router();
const userAuthMiddleware = require("../middleware/userAuthMiddleware");
const {
  placeOrder,
  getOrder,
  cancelOrder,
} = require("../controllers/orderController");

router.post("/placeorder", userAuthMiddleware, placeOrder);
router.post("/getorder", userAuthMiddleware, getOrder);
router.post("/cancelorder", userAuthMiddleware, cancelOrder);

module.exports = router;
