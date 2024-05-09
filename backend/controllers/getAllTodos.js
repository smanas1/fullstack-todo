const todoModel = require("../models/todoModel");

const getAllTodos = async (req, res) => {
  try {
    const data = await todoModel
      .find()
      .populate("creator", "-password")
      .sort({ _id: -1 });
    res.send(data);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = getAllTodos;
