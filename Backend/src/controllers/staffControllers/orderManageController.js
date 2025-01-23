const Order = require('../../models/orderModel'); // Assuming you have an Order model
const User = require('../../models/userModel');   // Assuming you have a User model
const Product = require('../../models/menuModel'); // Assuming you have a Product model

module.exports.allorders = async (req, res) => {
    try {
        // Populate userId with user details and items.productId with product details
        const orders = await Order.find()
            .populate({
                path: 'userId',
                model: 'User',
                select: 'name email', // Only include name and email from User
            })
            .populate({
                path: 'items.productId',
                model: 'MenuItem',
                select: 'name price category', // Include relevant product details
            });

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error in allorders:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.updateStatus = async (req, res) => {
    const { orderId } = req.body; // Order ID from the request parameters
    const { status } = req.body; // New status from the request body

    try {
        // Validate the status against the allowed values from the schema
        const validStatuses = Order.schema.path('status').enumValues;
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Allowed values are: ${validStatuses.join(', ')}`
            });
        }

        // Find the order by ID and update the statuss
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // Return the updated order document
        );

        // Check if the order exists
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Send the updated order in the response
        res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Error updating order status:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}
