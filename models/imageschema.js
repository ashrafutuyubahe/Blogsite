const Dbconnection = require("../DBconfig/Dbconnection");
const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: string, required: true },
});

const imageModel = new mongoose.model("imageModel", imageSchema);

module.exports = imageModel;
