const express = require('express');
const router = express.Router();
const { getStatistics , getStaffStatistics } = require('../../controllers/managerControllers/statisticsController');
const adminAuthMiddleware = require('../../middleware/adminAuthMiddleware');
const staffAuthMiddleware = require('../../middleware/staffAuthMiddleware');
const verifyToken = require('../../middleware/verifyTokenMiddleware');
router.get('/getStatistics', adminAuthMiddleware , verifyToken ,getStatistics);
router.get('/getStaffStatistics', staffAuthMiddleware , verifyToken , getStaffStatistics);
 
module.exports = router;