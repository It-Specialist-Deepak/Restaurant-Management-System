const express = require('express');
const router = express.Router();

const { updateAvailibility } = require("../../controllers/staffControllers/menuManageController");
const staffAuthMiddleware = require('../../middleware/staffAuthMiddleware');
const verifyToken = require('../../middleware/verifyTokenMiddleware');
router.put('/update-availibility', staffAuthMiddleware, verifyToken , updateAvailibility);


module.exports = router;