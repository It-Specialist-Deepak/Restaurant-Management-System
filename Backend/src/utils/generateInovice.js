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

      // Invoice Header
      doc
        .fontSize(20)
        .font("Helvetica-Bold")
        .text("Food Hunter Invoice", { align: "right" })
        .moveDown();

      doc
        .fontSize(12)
        .font("Helvetica")
        .text(`Invoice ID: ${invoice._id}`, { align: "right" })
        .text(`Date: Thank you for given time`, { align: "right" })
        .moveDown();

      // Customer Details
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("Bill To:")
        .font("Helvetica")
        .text(`Mr. ${invoice.user.fullname}`)
        .moveDown();

      // Table Headers for Items
      doc.font("Helvetica-Bold").fontSize(12);
      const tableTop = doc.y + 10;
      const colWidths = [150, 100, 80, 80, 80];
      const colX = [50, 200, 310, 400, 480];

      doc.text("Item", colX[0], tableTop);
      doc.text("Category", colX[1], tableTop);
      doc.text("Qty", colX[2], tableTop, { align: "center" });
      doc.text("Price", colX[3], tableTop, { align: "center" });
      doc.text("Total", colX[4], tableTop, { align: "right" });
      doc.moveDown();
      doc.font("Helvetica").fontSize(12);

      let totalAmount = 0;
      let yPosition = doc.y + 5;

      invoice.items.forEach((item) => {
        const totalPrice = item.quantity * item.price;
        totalAmount += totalPrice;

        doc.text(item.name, colX[0], yPosition);
        doc.text(item.category, colX[1], yPosition);
        doc.text(item.quantity.toString(), colX[2], yPosition, { align: "center" });
        doc.text(`$${item.price.toFixed(2)}`, colX[3], yPosition, { align: "center" });
        doc.text(`$${totalPrice.toFixed(2)}`, colX[4], yPosition, { align: "right" });

        yPosition += 20;
      });

      doc.moveDown(2);

      // Total Amount
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(`Total Amount: $${totalAmount.toFixed(2)}`, { align: "right" });

      doc.moveDown(2);

      // Footer
      doc
        .font("Helvetica")
        .fontSize(12)
        .text("Thank you for given time", { align: "center" })
        .moveDown()
        .text("For any queries, contact us at support@foodhunter.com", { align: "center" });

      doc.end();
      stream.on("finish", () => resolve(`/invoices/${fileName}`));
      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateInvoice };
