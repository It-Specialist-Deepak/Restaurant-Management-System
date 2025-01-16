const express = require('express');
const router = express.Router();
const { Allmenu, createMenu } = require("../controllers/menuController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/menu', Allmenu); // For fetching all menus
router.post('/createmenu', upload.single("image"), createMenu); // For creating a menu with image upload

module.exports = router;
