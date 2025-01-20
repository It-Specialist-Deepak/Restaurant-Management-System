const express = require('express');
const router = express.Router();

const { addtoCart , getCart , updatequantity , updateTableQuantity , deleteCart} = require("../controllers/cartController");

router.post('/add-to-cart', addtoCart);
router.post("/getcart", getCart);
router.post("/update-quantity", updatequantity);
router.post("/table-quantity", updateTableQuantity);
router.post("/deletecart", deleteCart);

module.exports = router;