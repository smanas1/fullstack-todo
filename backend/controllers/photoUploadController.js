const userModel = require("../models/userModel");
require("dotenv").config();
const photoUploadController = async (req, res) => {
  await userModel.findByIdAndUpdate(
    { _id: req.headers.userid },
    { profilePhoto: `/uploads/${req.file.filename}` }
  );
  res.send(req.file);
};
module.exports = photoUploadController;
