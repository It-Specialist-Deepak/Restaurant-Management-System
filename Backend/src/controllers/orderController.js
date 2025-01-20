const Product = require('../models/menuModel'); // Assuming you have a Product model for MenuItems
const Order = require('../models/orderModel'); // Assuming you have an Order model
const Cart = require('../models/cartModel'); // Assuming you have a Cart model


module.exports.placeOrder = async (req, res) => {
  try {
    const { userId, cartId } = req.body;

    // Fetch cart by cartId and userId with explicit model population
    const cart = await Cart.findOne({ userId, _id: cartId })
      .populate({
        path: 'items.productId',
        model: 'MenuItem' // Explicitly specify the Product model
      });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Calculate total amount
    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.productId.price * item.quantity;
    });

    // Create new order
    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount,
      table: cart.table, 
    });
    

    // Save order
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
