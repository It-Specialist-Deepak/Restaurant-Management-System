const express = require("express");
const router = express.Router();
const userAuthMiddleware = require("../middleware/userAuthMiddleware");
const verifyToken = require("../middleware/verifyTokenMiddleware");
const {
  placeOrder,
  getOrder,
  cancelOrder,
  activeStatus,
} = require("../controllers/orderController");

router.post("/placeorder", userAuthMiddleware, verifyToken ,placeOrder);
router.post("/getorder", userAuthMiddleware, verifyToken ,getOrder);
router.post("/cancelorder", userAuthMiddleware, verifyToken ,cancelOrder);
router.post("/activeStatus", userAuthMiddleware, verifyToken , activeStatus);

module.exports = router;
