const express = require('express');
const router = express.Router();

const { Register , login , forgetPassword , ResetPassword } = require("../controllers/authController");
router.post('/register', Register);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post("/reset-password/:token", ResetPassword);

module.exports = router;