const todoModel = require("../models/todoModel");

const editTodoController = async (req, res) => {
  try {
    const { id, todo, des } = req.body;
    if (!todo) {
      return res.status(400).send("Please enter a todo");
    }
    await todoModel.findOneAndUpdate({ _id: id }, { todo: todo, des: des });
    res.send("TODO Updated");
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = editTodoController;
