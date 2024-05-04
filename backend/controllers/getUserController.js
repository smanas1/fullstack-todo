const userModel = require("../models/userModel");

const getUserController = async (req, res) => {
  const { id } = req.body;
  const data = await userModel.findOne({ _id: id });
  res.send(data);
};
module.exports = getUserController;
