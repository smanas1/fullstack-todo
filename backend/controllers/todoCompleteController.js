const todoModel = require("../models/todoModel");

const todoCompleteController = async (req, res) => {
  try {
    await todoModel.findByIdAndUpdate(
      { _id: req.params.id },
      { status: "completed" },
      { new: true }
    );
    res.status(200).send("TODO Completed");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = todoCompleteController;
