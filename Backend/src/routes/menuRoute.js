const express = require('express');
const router = express.Router();
const { Allmenu, createMenu , Adminmenu } = require("../controllers/menuController");
const multer = require("multer");
const staffAuthMiddleware = require('../middleware/staffAuthMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/menu', Allmenu); 
router.get('/adminmenu', staffAuthMiddleware ,verifyToken ,Adminmenu); 
router.post('/createmenu', upload.single("image"), staffAuthMiddleware, verifyToken ,createMenu); 

module.exports = router;
