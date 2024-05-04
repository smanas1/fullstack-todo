const todoModel = require("../models/todoModel");

const postTodoControler = async (req, res) => {
  try {
    const { todo, des, creator } = req.body;

    if (!todo) {
      return res.status(400).send("Please enter a todo");
    }
    const data = new todoModel({
      todo: todo,
      des: des,
      creator: creator,
    });
    await data.save();
    res.send("TODO Added");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = postTodoControler;
