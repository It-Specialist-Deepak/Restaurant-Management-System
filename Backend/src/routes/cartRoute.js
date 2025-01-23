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

router.post("/add-to-cart", userAuthMiddleware, addtoCart);
router.post("/getcart", userAuthMiddleware, getCart);
router.post("/update-quantity", userAuthMiddleware, updatequantity);
router.post("/table-quantity", userAuthMiddleware, updateTableQuantity);
router.post("/deletecart", userAuthMiddleware, deleteCart);

module.exports = router;
