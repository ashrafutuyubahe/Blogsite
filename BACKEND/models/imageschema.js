const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true }, // To store the MIME type of the image
  imageData: { type: Buffer, required: true } // To store the image data as a buffer
});

const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;
