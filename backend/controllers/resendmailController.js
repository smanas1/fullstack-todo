const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

require("dotenv").config();

require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anasolin01777@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const resendEmail = async (req, res) => {
  const { email } = req.body;
  let existingUser = await userModel.findOne({ email: email });
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Please Enter a valid email");
  }

  if (!existingUser) {
    return res.status(400).send("This Email Not Found");
  }

  if (existingUser.emailverifyed) {
    return res.status(400).send("This Email Already Verified");
  }

  const token = jwt.sign({ email: email }, process.env.TOKENKEY, {
    expiresIn: "5m",
  });
  res.send({ email: email, token: token });
  const info = await transporter.sendMail({
    from: "Oraby", // sender address
    to: email, // list of receivers
    subject: "Email Verify", // Subject line
    html: `<b>Your Verify Link <a href="http://localhost:3000/linkverify/${token}">Click Here</a> : </b>`, // html body
  });
};

module.exports = resendEmail;
