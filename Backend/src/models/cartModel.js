const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema],
  table: { type: Number, default: 1 },  // Change ObjectId to Number or String
  totalAmount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', CartSchema);
