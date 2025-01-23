const express = require('express');
const router = express.Router();

const { updateAvailibility } = require("../../controllers/staffControllers/menuManageController");
const staffAuthMiddleware = require('../../middleware/staffAuthMiddleware');
router.put('/update-availibility', staffAuthMiddleware , updateAvailibility);



module.exports = router;