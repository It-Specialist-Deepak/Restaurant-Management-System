const express = require('express');
const router = express.Router();

const { Register , login } = require("../controllers/authController");
router.post('/register', Register);
router.post('/login', login);

module.exports = router;