const Product = require('../../models/menuModel');

module.exports.updateAvailibility = async (req, res) => {
    const { productId } = req.body; // Product ID from the request parameters
    const { availability } = req.body; // New availability value from the request body

    try {
        // Validate that the availability is a boolean
        if (typeof availability !== 'boolean') {
            return res.status(400).json({ message: 'Invalid value for availability. It must be true or false.' });
        }

        // Find the product by ID and update the availability
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { availability },
            { new: true } // Return the updated product document
        );

        // Check if the product exists
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Send the updated product in the response
        res.status(200).json({
            message: 'Product availability updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        console.error('Error updating product availability:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}