const path = require("path");
const Invoice = require("../models/InvoiceModel");


module.exports.downloadInvoice = async (req, res) => {
    try {
        const { invoiceId, userId } = req.body; // Get invoiceId & userId from request

        const invoice = await Invoice.findOne({ _id: invoiceId, user: userId });

        if (!invoice || !invoice.pdfUrl) {
            return res.status(404).json({ message: "Invoice not found or access denied" });
        }

        const filePath = path.join(__dirname, "..", invoice.pdfUrl);
        console.log(`Downloading file: ${filePath}`);

        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "Error downloading invoice", error: error.message });
    }
};

