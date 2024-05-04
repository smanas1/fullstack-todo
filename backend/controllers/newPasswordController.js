const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const newPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    if (password.length < 6) {
      return res.status(401).send("Password Must be at least 6 characters");
    }
    const decoded = jwt.verify(token, "shhhhh");

    bcrypt.hash(password, 8, async function (err, hash) {
      try {
        await userModel.findOneAndUpdate(
          { email: decoded.email },
          { password: hash }
        );
        res.send("Password Has been Changed");
        if (err) {
          console.log(err);
        }
      } catch (error) {
        res.status(500).send("Server Error");
      }
    });
  } catch (error) {
    res.status(400).send("Your Link is expired");
  }
};

module.exports = newPassword;
