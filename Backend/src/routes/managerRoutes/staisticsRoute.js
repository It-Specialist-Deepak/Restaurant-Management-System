const express = require('express');
const router = express.Router();
const { getStatistics } = require('../../controllers/managerControllers/statisticsController');
const adminAuthMiddleware = require('../../middleware/adminAuthMiddleware');
const verifyToken = require('../../middleware/verifyTokenMiddleware');
router.get('/getStatistics', adminAuthMiddleware , verifyToken ,getStatistics);

module.exports = router;