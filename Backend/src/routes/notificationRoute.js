const express = require("express");
const router = express.Router();
const { getUserNotifications, markNotificationAsRead } = require("../controllers/notificationController");
const verifyToken = require("../middleware/verifyTokenMiddleware");
const userAuthMiddleware = require("../middleware/userAuthMiddleware");

router.post("/get-notifications", userAuthMiddleware  , verifyToken, getUserNotifications);
router.put("/:notificationId/read", userAuthMiddleware ,verifyToken, markNotificationAsRead);

module.exports = router;
