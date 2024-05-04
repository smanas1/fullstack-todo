require("dotenv").config();
const secureApi = (req, res, next) => {
  if (req.headers.key == process.env.SECUREAPI) {
    next();
  } else {
    res.status(401).send("Invalid API key");
  }
};

module.exports = secureApi;
