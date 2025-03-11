const Notification = require("../models/NotificationModel");

module.exports.getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.body; ; // Get user from token
        const notifications = await Notification.find({ user: userId, isRead: false })
        .sort({ createdAt: -1 });
      
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
};

module.exports.markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
         
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Error updating notification", error: error.message });
    }
};
