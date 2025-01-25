const express = require('express');
const router = express.Router();

const { createVacancy , getAllVacancy , deleteVacancy } = require("../../controllers/managerControllers/careerControllers");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
router.post('/create-vacancy', adminAuthMiddleware , createVacancy);
router.get('/get-vacancy' , getAllVacancy);
router.delete('/delete-vacancy', adminAuthMiddleware , deleteVacancy);

module.exports = router;