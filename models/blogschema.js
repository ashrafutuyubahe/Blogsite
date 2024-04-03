const { string } = require("joi");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blog: {
    authorname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    blogtitle: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    blogdescription: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200,
    },
    blogcontent: {
      type: String,
      required: true,
      minlength: 50,
    },
    date: {
      type: Date,
      default: Date.now,
    }   
  },
  authordetails: {
    location: { type:String, minlength:5, required: true },
    github: { type: String, trim: true }
  }
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
