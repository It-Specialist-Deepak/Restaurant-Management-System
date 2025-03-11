const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        invoiceUrl: { type: String, default: null }, // PDF link if available
        isRead: { type: Boolean, default: false }, // Track read/unread status
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
