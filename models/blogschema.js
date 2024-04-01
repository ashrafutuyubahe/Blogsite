const mongoose = require("mongoose");
const conn= require("./dbconn");

const blogSchema = new mongoose.Schema({
    blogtitle: { type: String, required: true },
    blogcontent: { type: String, required: true },
    authorname: { type: String, required: true },
    datecreated: { type: Date, required: true }
});

const Blog = mongoose.model("Blogs", blogSchema);

module.exports = Blog;
