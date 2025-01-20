
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');  

module.exports.Register = async function (req, res) {
  try {
    const { email, password, fullname, userRole = 'user' } = req.body;

   
    if (!email || !password || !fullname) {
      return res.status(400).json({ message: 'Please enter all the fields.' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      fullname,
      password: hashedPassword,
      email,
      userRole,
    });

    if (user) {
      return res.status(201).json({
        fullname: user.fullname,
        email: user.email,
        userid: user._id,
        userRole: user.userRole,
        token: generateToken(user),  
      });
    } else {
      return res.status(400).json({ message: 'User not created.' });
    }
  } catch (err) {
    console.error('Error in user registration:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
// login Api
module.exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email or Password Incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // If password matches
    if (isMatch) {
      return res.json({
        fullname: user.fullname,
        email: user.email,
        userid: user._id,
        userRole: user.userRole, 
        token: generateToken(user),
      });
    } else {
      return res.status(400).json({ message: 'Email or Password Incorrect' });
    }
  } catch (err) {
    console.error('Error during login:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
