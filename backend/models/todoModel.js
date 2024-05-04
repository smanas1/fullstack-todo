const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: {
    type: "string",
    required: true,
  },
  des: {
    type: "string",
  },

  creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: "string",
    enum: ["running", "completed"],
    default: "running",
  },
});

module.exports = mongoose.model("todo", todoSchema);
