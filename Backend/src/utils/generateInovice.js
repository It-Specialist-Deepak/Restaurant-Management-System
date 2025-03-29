const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Function to Generate Professional Invoice PDF
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

      // Add Logo
      const logoPath = path.join(__dirname, "../assets/food-hunter.jpg");
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 30, { width: 80 });
      }

      // Invoice Title & Info
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("Food Hunter Invoice", { align: "right" })
        .moveDown();

      doc
        .fontSize(12)
        .font("Helvetica")
        .text(`Invoice ID: ${invoice._id}`, { align: "right" })
        .text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" })
        .moveDown();

      // Company Info
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Food Hunter Pvt Ltd", 50, 120)
        .font("Helvetica")
        .text("123 Foodie Street", 50, 135)
        .text("Delicious City, FL 12345", 50, 150)
        .text("support@foodhunter.com", 50, 165)
        .moveDown();

      // Customer Details
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("Bill To:", 50, 190)
        .font("Helvetica")
        .text(`Mr. ${invoice.user.fullname}`, 50, 205)
        .text(`Email: ${invoice.user.email}`, 50, 220)
        .moveDown();

      // Draw Table Header
      const tableTop = 250;
      const colWidths = [160, 100, 80, 80, 90];
      const colX = [50, 210, 310, 400, 490];

      doc
        .moveTo(50, tableTop)
        .lineTo(550, tableTop)
        .stroke();

      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Item", colX[0], tableTop + 5)
        .text("Category", colX[1], tableTop + 5)
        .text("Qty", colX[2], tableTop + 5, { align: "center" })
        .text("Price", colX[3], tableTop + 5, { align: "center" })
        .text("Total", colX[4], tableTop + 5, { align: "right" });

      doc
        .moveTo(50, tableTop + 20)
        .lineTo(550, tableTop + 20)
        .stroke();

      // Table Rows
      doc.font("Helvetica").fontSize(12);
      let yPosition = tableTop + 30;
      let totalAmount = 0;

      invoice.items.forEach((item, index) => {
        const totalPrice = item.quantity * item.price;
        totalAmount += totalPrice;

        doc.text(item.name, colX[0], yPosition)
          .text(item.category, colX[1], yPosition)
          .text(item.quantity.toString(), colX[2], yPosition, { align: "center" })
          .text(`$${item.price.toFixed(2)}`, colX[3], yPosition, { align: "center" })
          .text(`$${totalPrice.toFixed(2)}`, colX[4], yPosition, { align: "right" });

        yPosition += 25;

        if (index < invoice.items.length - 1) {
          doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke(); // Row separator
          yPosition += 5;
        }
      });

      doc
        .moveTo(50, yPosition + 5)
        .lineTo(550, yPosition + 5)
        .stroke();

      // Total Amount
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(`Total Amount: $${totalAmount.toFixed(2)}`, colX[4], yPosition + 20, { align: "right" });

      // Greetings & Footer
      doc
        .moveDown(2)
        .font("Helvetica-Bold")
        .fontSize(14)
        .text("Thank You for Your Order!", { align: "center" });

      doc
        .moveDown()
        .font("Helvetica")
        .fontSize(12)
        .text("We hope you enjoy your meal!", { align: "center" })
      

      doc.end();
      stream.on("finish", () => resolve(`/invoices/${fileName}`));
      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateInvoice };
