const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      return res.status(401).send("all fildes are required");
    }

    if (!emailRegex.test(email)) {
      return res.status(401).send("Invalid email");
    }

    if (password.length < 6) {
      return res.status(401).send("password must be at least 6 characters");
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result == true) {
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
            role: user.role,
          });
        } else {
          return res.status(401).send("Invalid Password");
        }
        if (err) {
          console.log(err);
        }
      });
    } else {
      return res.status(401).send("Email Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = loginController;
