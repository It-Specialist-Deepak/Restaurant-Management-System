const express = require('express');
const router = express.Router();

const { allorders , updateStatus } = require("../../controllers/staffControllers/orderManageController");
const staffAuthMiddleware = require('../../middleware/staffAuthMiddleware');
const verifyToken = require('../../middleware/verifyTokenMiddleware');
router.get('/all-orders', staffAuthMiddleware , verifyToken ,allorders);
router.put('/update-status', staffAuthMiddleware, verifyToken ,updateStatus);


module.exports = router;