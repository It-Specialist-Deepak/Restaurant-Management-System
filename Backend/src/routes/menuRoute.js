const express = require('express');
const router = express.Router();
const { Allmenu, createMenu } = require("../controllers/menuController");
const multer = require("multer");
const staffAuthMiddleware = require('../middleware/staffAuthMiddleware');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/menu', Allmenu); 
router.post('/createmenu', upload.single("image"), staffAuthMiddleware ,createMenu); 

module.exports = router;
