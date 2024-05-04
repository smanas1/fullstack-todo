require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    var decoded = jwt.verify(token, process.env.TOKENKEY);
    if (decoded) {
      next();
    } else {
      res.status(401).send("Token Expired");
    }
  } catch (err) {
    res.status(401).send("Token Expired");
  }
};
module.exports = verifyToken;
