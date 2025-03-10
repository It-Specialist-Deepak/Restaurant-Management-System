const express = require("express");
const router = express.Router();
const userAuthMiddleware = require("../middleware/userAuthMiddleware");
const {
  addtoCart,
  getCart,
  updatequantity,
  updateTableQuantity,
  deleteCart,
} = require("../controllers/cartController");
const verifyToken = require("../middleware/verifyTokenMiddleware");

router.post("/add-to-cart", userAuthMiddleware, verifyToken , addtoCart);
router.post("/getcart", userAuthMiddleware, verifyToken , getCart);
router.post("/update-quantity", userAuthMiddleware, verifyToken , updatequantity);
router.post("/table-quantity", userAuthMiddleware, verifyToken , updateTableQuantity);
router.post("/deletecart", userAuthMiddleware, verifyToken ,deleteCart);

module.exports = router;
