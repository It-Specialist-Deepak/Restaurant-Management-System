const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true }, // Store product name
        price: { type: Number, required: true }, // Store product price
        category: { type: String, required: true }, // Store product category
        quantity: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Completed", "Cancelled"], default: "Pending" },
    pdfUrl: { type: String, default: null }, // Store PDF URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
