const path = require("path");
const Invoice = require("../models/InvoiceModel");

module.exports.downloadInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params;

        const invoice = await Invoice.findById(invoiceId);
        if (!invoice || !invoice.pdfUrl) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        const filePath = path.join(__dirname, "..", invoice.pdfUrl);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "Error downloading invoice", error: error.message });
    }
};
