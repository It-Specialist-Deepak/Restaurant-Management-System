
const userModel = require('../models/userModel');
const Blacklist = require ('../models/BlacklistModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken'); 
var nodemailer = require('nodemailer'); 

// register api
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
// forget password api
module.exports.forgetPassword = async function (req, res){
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if(!user){
      return res.status(400).json({ message: 'User Not Found' });
    }
  
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY ,
      { expiresIn: '1d' }
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true, 
      auth: {
        user: process.env.MY_GMAIL ,
        pass: process.env.MY_GMAIL_PASS ,
      },
    });
    const receiver = {
      from : process.env.MY_GMAIL ,
      to : email ,
      subject : "Password Reset Request" ,
      text : ` Welcome to Food Hunter Click on this link to generate new Password ${process.env.CLIENT_URL}/reset-password/${token}`
    };
    await transporter.sendMail(receiver);
    return res.status(200).send({ message: "Password Reset Link Sent Sucessfully"})
  }
  catch ( err ){
    console.error("Something went wrong", err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
// Reset Password api
module.exports.ResetPassword = async function(req, res)
{
  try{
    const {token} = req.params ;
    const {password} = req.body ;
    if(!password){
    return res.status(400).send( { message: "Please Provide Password"})
    }
    const decode = jwt.verify(token , process.env.JWT_KEY)
    const user =  await userModel.findOne({_id:decode.id})
  
    const salt = await bcrypt.genSalt(10);
    const newhashpassword = await bcrypt.hash(password, salt);
    user.password = newhashpassword ;
    await user.save();

    return res.status(200).send( { message: "password reset Sucessfully"})
  }
  catch(err){
  console.error("Something went wrong", err)};
  return res.status(500).json({ message: 'Internal Server Error' });
}
// Logout user
module.exports.Logout = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token provided" });

  try {
      const existingToken = await Blacklist.findOne({ token });
      if (existingToken) return res.status(400).json({ message: "Token already blacklisted" });

      const blacklistedToken = new Blacklist({ token });
      await blacklistedToken.save();

      res.json({ message: "User logged out successfully" });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
};