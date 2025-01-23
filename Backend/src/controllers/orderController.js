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
      table: cart.table, 
    });
    console.log("table" , cart.table);
    
    await newOrder.save();

    // Remove the entire cart after placing the order
    await Cart.deleteOne({ _id: cartId });

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
      table: cart.table, // Include the table in the response
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
