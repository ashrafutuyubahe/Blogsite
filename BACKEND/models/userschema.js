const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // trim: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
    // trim: true,
  },
  userpassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 225,
    // trim: true,
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
