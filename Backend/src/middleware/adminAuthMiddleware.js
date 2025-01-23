const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path to your User model

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Retrieve the user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Check if the user's role is admin
    if (user.userRole !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Access restricted to admin only' });
    }

    // Attach user info to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = adminAuthMiddleware;
