const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    lowStockAlert: { type: Number, default: 10 },
  });
  
  module.exports = mongoose.model('Inventory', InventorySchema);
  