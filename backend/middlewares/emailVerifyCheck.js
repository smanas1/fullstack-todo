const userModel = require("../models/userModel");

const emailVerifyCheck = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Valid Email Required");
    }
    const user = await userModel.findOne({ email: email });
    if (user.emailverifyed) {
      next();
    } else {
      return res.status(401).send("Please Verify your email");
    }
  } catch (error) {
    return res.status(400).send("Valid Email Required");
  }
};

module.exports = emailVerifyCheck;
