require("dotenv").config();
const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => console.error(err));
};
module.exports = dbConnection;
