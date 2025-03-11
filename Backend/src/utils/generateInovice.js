const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// 🔹 Function to Generate Invoice PDF
const generateInvoice = async (invoice) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `invoice_${invoice._id}.pdf`;
      const invoiceDir = path.join(__dirname, "../invoices");

      // Ensure invoices directory exists
      if (!fs.existsSync(invoiceDir)) {
        fs.mkdirSync(invoiceDir, { recursive: true });
      }

      const filePath = path.join(invoiceDir, fileName);
      const doc = new PDFDocument({ margin: 50 });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // 🔹 Add Restaurant Logo (Replace with actual file path)
      const logoPath = path.join(__dirname, "../assets/food-hunter.jpg");
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 140, 20, { width: 70 });
      }

      // 🔹 Add Restaurant & Customer Details
      doc.fontSize(20).text("Food Hunter Invoice", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`Invoice ID: ${invoice._id}`);
      doc.text(`Date: ${new Date().toLocaleString()}`);
      doc.text(`Customer: ${invoice.user.fullname}`); // Assuming user model has `name`

      doc.moveDown();

      // 🔹 Table Headers
      // Set font to bold for headers
      doc.font("Helvetica-Bold").fontSize(12);

      // Define table starting position
      const startX = 50;
      let startY = doc.y; // Use doc.y dynamically
      // Column widths
      // Column widths (Adjusted for better spacing)
      const col1 = 100; // Item
      const col2 = 100; // Category
      const col3 = 100; // Quantity
      const col4 = 100; // Price (per Item)
      const col5 = 100; // Total Price (Qty * Price)

      const rowSpacing = 15; // Space between rows

      // Print table headers (Bold)
      doc.font("Helvetica-Bold").fontSize(12);
      doc.text("Item", startX, startY, { width: col1, align: "left" });
      doc.text("Category", startX + col1, startY, {
        width: col2,
        align: "left",
      });
      doc.text("Qty", startX + col1 + col2, startY, {
        width: col3,
        align: "center",
      });
      doc.text("Price (per Item)", startX + col1 + col2 + col3, startY, {
        width: col4,
        align: "center",
      });
      doc.text("Total", startX + col1 + col2 + col3 + col4, startY, {
        width: col5,
        align: "right",
      });

      doc.moveDown(1); // Space after headers

      // Reset font for table rows
      doc.font("Helvetica").fontSize(12);

      let totalAmount = 0; // Track total amount

      // Print each item in the table
      invoice.items.forEach((item) => {
        startY = doc.y; // Update Y position dynamically
        const totalPrice = item.quantity * item.price;
        totalAmount += totalPrice; // Accumulate total price

        doc.text(item.name, startX, startY, { width: col1, align: "left" });
        doc.text(item.category, startX + col1, startY, {
          width: col2,
          align: "left",
        });
        doc.text(item.quantity.toString(), startX + col1 + col2, startY, {
          width: col3,
          align: "center",
        });
        doc.text(
          `$${item.price.toFixed(2)}`,
          startX + col1 + col2 + col3,
          startY,
          { width: col4, align: "center" }
        );
        doc.text(
          `$${totalPrice.toFixed(2)}`,
          startX + col1 + col2 + col3 + col4,
          startY,
          { width: col5, align: "right" }
        );

        doc.moveDown(0.7); // Maintain proper row spacing
      });

      doc.moveDown(1);
      doc.font("Helvetica-Bold").fontSize(14);

      // 🔹 Add Total Amount
      doc.moveDown();
      doc
        .fontSize(14)
        .text(`Total Amount: $${invoice.totalAmount}`, { align: "right" });

      // 🔹 Footer
      doc.moveDown();
      doc.fontSize(12);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text("Thank you for dining with us!", { align: "center" });

      doc.end();

      stream.on("finish", () => resolve(`/invoices/${fileName}`));
      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { generateInvoice };
