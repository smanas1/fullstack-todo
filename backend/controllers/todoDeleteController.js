const todoModel = require("../models/todoModel");

const todoDeleteController = async (req, res) => {
  try {
    await todoModel.findByIdAndDelete({ _id: req.params.id });
    res.send("Todo Deleted");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = todoDeleteController;
