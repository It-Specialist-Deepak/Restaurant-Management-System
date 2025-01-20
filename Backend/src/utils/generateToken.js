const jwt = require('jsonwebtoken');

// Function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },  
    process.env.JWT_KEY ,  
    { expiresIn: '1d' } 
  );
};

module.exports = generateToken;
