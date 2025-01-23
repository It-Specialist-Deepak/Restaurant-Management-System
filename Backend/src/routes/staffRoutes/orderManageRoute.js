const express = require('express');
const router = express.Router();

const { allorders , updateStatus } = require("../../controllers/staffControllers/orderManageController");
const staffAuthMiddleware = require('../../middleware/staffAuthMiddleware');
router.get('/all-orders', staffAuthMiddleware ,allorders);
router.put('/update-status', staffAuthMiddleware, updateStatus);


module.exports = router;