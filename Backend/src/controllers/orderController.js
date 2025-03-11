const Product = require('../models/menuModel'); 
const Order = require('../models/orderModel'); 
const Cart = require('../models/cartModel'); 


module.exports.placeOrder = async (req, res) => {
  try {
    const { userId, cartId } = req.body;

    const cart = await Cart.findOne({ userId, _id: cartId })
      .populate({
        path: 'items.productId',
        model: 'MenuItem' // Explicitly specify the Product model
      });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.productId.price * item.quantity;
    });
    
    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount,
    });
    await newOrder.save();
    await Cart.deleteOne({ _id: cartId });

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
      table: cart.table, 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};
module.exports.getOrder = async (req, res) => {
  try {
    const { userId } = req.body; 
  
    const orders = await Order.find({ userId, status: 'Pending' }).populate({
      path: 'items.productId', 
      model: 'MenuItem',
      select: 'name price image category' 
    });
    
    if (!orders.length) {
      return res.status(404).json({ message: 'Pending orders not found for this user' });
    }
    return res.status(200).json(orders);
  
  } catch (err) {
    console.error('Error in getOrder API:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.cancelOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    const order = await Order.findOne({ userId, _id: orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order', error: error.message });
  }
};

const Invoice = require("../models/InvoiceModel");
const Notification = require("../models/NotificationModel");
const { generateInvoice } = require("../utils/generateInovice");
module.exports.activeStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Fetch order & populate user, items, and product details
    const order = await Order.findById(orderId)
      .populate({
        path: "userId",
        select: "-password", // Exclude password field from user
      })
      .populate({
        path: "items.productId", // Populate product details inside items
        model: "MenuItem", // Reference to Product model
        select: "name price category", // Specify required fields
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    let pdfUrl = null;

    // If order is accepted, generate invoice and send notification
    if (status === "Accepted") {
      const newInvoice = new Invoice({
        order: order._id,
        user: order.userId,
        totalAmount: order.totalAmount,
        items: order.items.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name, // ✅ Extract product name
          price: item.productId.price, // ✅ Extract product price
          category: item.productId.category,
          quantity: item.quantity
        })),
      });

      await newInvoice.save();
      pdfUrl = await generateInvoice(newInvoice);
      newInvoice.pdfUrl = pdfUrl;
      await newInvoice.save();

      // Send Notification to User
      const newNotification = new Notification({
        user: order.userId,
        message: `Your order #${order._id} has been accepted. You can download the invoice.`,
        invoiceUrl: pdfUrl,
      });

      await newNotification.save();
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error: error.message });
  }
};