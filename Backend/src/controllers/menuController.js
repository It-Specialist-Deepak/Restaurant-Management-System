const menuModel = require("../models/menuModel");

module.exports.createMenu = async (req, res) => {
    try {
      const { name, category, price, description, availability } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }
      const newMenu = new menuModel({
        image: req.file.buffer, // Save image as a buffer (binary data)
        name,
        category,
        price,
        description,
        availability,
      });

      console.log(newMenu);
      await newMenu.save();
      res.status(201).json({ message: "Menu created successfully", success: true });
    } catch (error) {
      console.error(error.message); // Log error for debugging
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
module.exports.Allmenu = async (req, res) => {
  try {
    const products = await menuModel.find({ availability: true });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
