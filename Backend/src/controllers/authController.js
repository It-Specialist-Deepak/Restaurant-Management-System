const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

module.exports.Register = async (req, res) => {
  try {
    const { email, password, fullname, userRole = "user" } = req.body;

    // Validate required fields
    if (!email || !password || !fullname) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if the user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new userModel({
      fullname,
      email,
      password: hashedPassword,
      userRole,
    });
    const savedUser = await user.save();

    // Return success response
    return res.status(201).json({
      fullname: savedUser.fullname,
      email: savedUser.email,
      userid: savedUser._id,
      userRole: savedUser.userRole,
      token: generateToken(savedUser),
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Return success response
    return res.status(200).json({
      fullname: user.fullname,
      email: user.email,
      userid: user._id,
      userRole: user.userRole,
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
