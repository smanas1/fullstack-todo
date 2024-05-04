const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbConfig");
const router = require("./routes/route");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

dbConnection();
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 8000");
});
