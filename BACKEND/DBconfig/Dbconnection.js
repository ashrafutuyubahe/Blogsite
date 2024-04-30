const mongoose = require("mongoose");
const dbconn = mongoose
  .connect("mongodb://localhost:27017/Blogsite")
  .then(console.log("the connection  to mongodb is set... "))
  .catch((error) => {
    console.error("error while stting connection to mongdb");
  }); 
  

  module.exports.dbconn;
