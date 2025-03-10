const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyTokenMiddleware')
const { Register , login , forgetPassword , ResetPassword , Logout } = require("../controllers/authController");
router.post('/register', Register);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post("/reset-password/:token", ResetPassword);
router.post("/logout", verifyToken , Logout);

module.exports = router;