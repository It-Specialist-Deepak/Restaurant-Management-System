const express = require("express");
const router = express.Router();

const { createFeedback , getFeedback} = require("../controllers/feedbackController");
const verifyToken = require("../middleware/verifyTokenMiddleware");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

router.post("/feedback", createFeedback);
router.get("/getfeedback", adminAuthMiddleware , verifyToken , getFeedback);

module.exports = router;