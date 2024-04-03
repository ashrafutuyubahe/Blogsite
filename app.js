const express = require("express");
const dbconn = require("./DBconfig/Dbconnection");
const usermodel = require("./models/userschema");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Joi = require("joi");
const BlogModel= require('./models/blogschema');
const path = require("path");
const fs = require("fs");
const { prototype } = require("events");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    let uservalidationschema = Joi.object({
      username: Joi.string().min(3).required(),
      useremail: Joi.string().email().required(),
      userpassword: Joi.string().required(),
    });

    const result = uservalidationschema.validate(req.body);

    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const { username, useremail, userpassword } = req.body;
    const newUser = new usermodel({
      username: username,
      useremail: useremail,
      userpassword: userpassword,
    });

    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);
    res.send("Registration successful");
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { useremail } = req.body;
    const { userpassword } = req.body;

    const user = await usermodel.findOne({ useremail });

   
    if (  !user || user.userpassword !== userpassword) {
      return res.send("Invalid email or password");
    }

    res.send("Login successful");
    
  } catch (error) {
    res.send("Error during login:", error.message);

    res.status(500).send("Internal Server Error");
  }
});

app.get('/createblog',(req,res)=>{
  res.render('createblog');
}) 
app.post('/createblog',async(req,res)=>{
  const {authorname,blogtitle,blogdes,blogcontent} =req.body;
  
})








app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
