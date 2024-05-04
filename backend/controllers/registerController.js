const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anasolin01777@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // regex
    let nameRegex = /^[a-zA-Z ]+$/;
    let existingUser = await userModel.find({ email: email });
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validations
    if (!name || !email || !password) {
      return res.status(401).send("all fildes are required");
    }

    if (!nameRegex.test(name)) {
      return res.status(401).send("Invalid name");
    }

    if (!emailRegex.test(email)) {
      return res.status(401).send("Invalid email");
    }

    if (password.length < 6) {
      return res.status(401).send("password must be at least 6 characters");
    }

    if (existingUser.length > 0) {
      return res.status(401).send("This Email Already Exists");
    } else {
      bcrypt.hash(password, 8, async function (err, hash) {
        const user = new userModel({
          name: name,
          email: email,
          password: hash,
        });
        await user.save();
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.TOKENKEY,
          {
            expiresIn: "24h",
          }
        );
        res.send({
          id: user._id,
          name: user.name,
          email: user.email,
          token: token,
        });
        const verifyToken = jwt.sign(
          { email: user.email },
          process.env.TOKENKEY,
          {
            expiresIn: "5m",
          }
        );
        const info = await transporter.sendMail({
          from: "TODO", // sender address
          to: email, // list of receivers
          subject: "Link Verify", // Subject line
          html: `<b>Your Verify Link <a href="http://localhost:3000/linkverify/${verifyToken}">Click Here</a> : </b>`, // html body
        });
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = registerController;
