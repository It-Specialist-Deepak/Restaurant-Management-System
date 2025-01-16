const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    availability: { type: Boolean, default: true },
    image: { type: Buffer } ,
  });
  
  module.exports = mongoose.model('MenuItem', MenuItemSchema);
  