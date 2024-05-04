const todoModel = require("../models/todoModel");

const getTodos = async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await todoModel.find({ creator: id }).sort({ _id: -1 });
    res.send(todo);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = getTodos;
