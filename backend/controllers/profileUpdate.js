const userModel = require("../models/userModel");

const profileUpdate = async (req, res) => {
  try {
    const { id, name, role } = req.body;
    if (!name) {
      return res.status(400).send("Please enter a name");
    }
    await userModel.findByIdAndUpdate({ _id: id }, { name: name, role: role });
    res.send("Profile updated");
  } catch (error) {
    console.log(error);
  }
};
module.exports = profileUpdate;
