const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', default: null },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Order', OrderSchema);
  