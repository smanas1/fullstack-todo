const userModel = require("../models/userModel");

const nameChangeController = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!name) {
      return res.status(400).send("Please enter a name");
    }
    await userModel.findByIdAndUpdate({ _id: id }, { name: name });
    res.send("Name Updated");
  } catch (error) {
    res.status(404).send(error.message);
  }
};
module.exports = nameChangeController;
