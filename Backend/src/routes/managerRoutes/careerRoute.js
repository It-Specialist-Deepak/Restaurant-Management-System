const express = require('express');
const router = express.Router();

const { createVacancy , getAllVacancy , deleteVacancy } = require("../../controllers/managerControllers/careerControllers");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
const verifyToken = require("../../middleware/verifyTokenMiddleware");
router.post('/create-vacancy', adminAuthMiddleware , verifyToken ,createVacancy);
router.get('/get-vacancy' , getAllVacancy);
router.delete('/delete-vacancy', adminAuthMiddleware , verifyToken , deleteVacancy);

module.exports = router;