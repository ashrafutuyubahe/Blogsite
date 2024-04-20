

const imageModel= require('../models/imageschema');
const asyncHandler = require("express-async-handler");

const handleFileUpload= asyncHandler( async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
     
      const newImage = new imageModel({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        imageData: req.file.buffer
      });
  
    
      await newImage.save();
  
      return res.status(201).json({ message: "Image uploaded successfully",newImage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports=handleFileUpload;