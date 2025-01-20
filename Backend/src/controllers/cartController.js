const Cart = require('../models/cartModel');
const Product = require('../models/menuModel');

module.exports.addtoCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Validate product ID and get product price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Cart exists, update item if it exists, otherwise add new item
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    } else {
      // No cart exists, create a new cart with the product and quantity 1
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    }

    // Recalculate totalAmount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + item.quantity * product.price;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// get all cart item
module.exports.getCart = async (req, res) => {
    try {
      const { userId } = req.body; 
  
      const cart = await Cart.findOne({ userId }).populate({
        path: 'items.productId', // productId references MenuItem
        model: 'MenuItem', // Specify the model name here explicitly
        select: 'name price image category' // Select only the required fields
      });
      
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this user' });
      }
  
      let totalAmount = 0;
      for (let item of cart.items) {
        totalAmount += item.productId.price * item.quantity; 
      }
      cart.totalAmount = totalAmount;
      return res.status(200).json(cart);
  
    } catch (err) {
      console.error('Error in getCart API:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  module.exports.updatequantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId })
      .populate({
        path: ('items.productId') ,
        model: 'MenuItem' // Explicitly specify the Product model
      });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found for this user" });
      }
  
      // Find the product in the cart
      const productInCart = cart.items.find(item => item.productId._id.equals(productId));
  
      if (productInCart) {
        if (isNaN(quantity) || quantity <= 0) {
          return res.status(400).json({ message: "Invalid quantity" });
        }
  
        // Update the product quantity
        productInCart.quantity = quantity;
  
        // Recalculate the total amount
        cart.totalAmount = cart.items.reduce((total, item) => {
          const price = item.productId.price || 0;
          const itemQuantity = item.quantity || 0;
      
          return total + price * itemQuantity;
        }, 0);
  
        // Save the updated cart
        await cart.save();
  
        return res.status(200).json({ message: "Quantity updated successfully", cart });
      } else {
        return res.status(404).json({ message: "Product not found in cart" });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports.updateTableQuantity = async (req, res) => {
    const { userId, tableQuantity } = req.body; // Assuming tableQuantity is passed in the request body
  
    try {
     
      if (isNaN(tableQuantity) || tableQuantity <= 0) {
        return res.status(400).json({ message: "Invalid table quantity" });
      }
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found for this user" });
      }
      cart.table = tableQuantity;
      await cart.save();
  
      return res.status(200).json({ message: "Table quantity updated successfully", cart });
    } catch (error) {
      console.error("Error updating table quantity:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  module.exports.deleteCart = async (req, res) => {
    const { userId, productId } = req.body; 
  
    try {
      // Find the user's cart
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found for this user" });
      }
  
      // Find the index of the product in the cart items array
      const productIndex = cart.items.findIndex(item => item.productId.equals(productId));
  
      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      // Remove the product from the cart's items array
      cart.items.splice(productIndex, 1);
  
      // If the cart is empty after deletion, delete the entire cart
      if (cart.items.length === 0) {
        // Delete the cart from the database
        await Cart.deleteOne({ userId });
  
        return res.status(200).json({ message: "Cart is empty. Cart deleted successfully" });
      }
      await cart.save();
  
      return res.status(200).json({ message: "Product deleted successfully", cart });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  