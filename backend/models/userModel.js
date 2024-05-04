const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  emailverifyed: {
    type: Boolean,
    default: false,
  },
  role: {
    type: "string",
    enum: ["admin", "manager", "user"],
    default: "user",
  },
  profilePhoto: {
    type: "string",
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
