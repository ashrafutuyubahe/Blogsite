const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  
    authorname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
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
      maxlength: 400,
    },
    blogcontent: {
      type: String,
      required: true,
      minlength: 50,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
    date: {
      type: Date,
      default: Date.now,
    },

});

const authorschema = mongoose.Schema({
  location: { type: String, minlength: 3, required: true },
  github: { type: String, trim: true },
  academic: { type: String, required: true },
});

const authorModel = new mongoose.model("Author", authorschema);
const BlogModel = mongoose.model("Blog", blogSchema);


module.exports = {
  BlogModel,
  authorModel
};

