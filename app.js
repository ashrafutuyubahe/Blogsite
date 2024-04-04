const express = require("express");
const dbconn = require("./DBconfig/Dbconnection");
const usermodel = require("./models/userschema");
const bodyParser = require("body-parser");
const session = require("express-session");
const ejs = require("ejs");
const Joi = require("joi");
const models = require("./models/blogschema");
const path = require("path");
const { model } = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
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

    if (!user || user.userpassword !== userpassword) {
      return res.send("Invalid email or password");
    }

    res.send("Login successful");
  } catch (error) {
    res.send("Error during login:", error.message);

    res.status(500).send("Internal Server Error");
  }
});

app.get("/createblog", (req, res) => {
  res.render("createblog");
});

app.post("/createblog", async (req, res) => {
  try {
    const blogvalidateschema = Joi.object({
      authorname: Joi.string().required(),
      blogtitle: Joi.string().min(5).required(),
      blogdes: Joi.string().min(5).required(),
      blogcontent: Joi.string().min(5).required(),
      image: Joi.string().min(5),
    });

    const validateblog = blogvalidateschema.validate(req.body);
    if (validateblog.error) {
      return res.status(400).send(validateblog.error.details[0].message);
    }

    const { authorname, blogtitle, blogdes, blogcontent } = req.body;

    const storeblog = new models.BlogModel({
      authorname,
      blogtitle,
      blogdescription: blogdes,
      blogcontent,
    });
    try {
      console.log(req.body);
      await storeblog.save();
      res.send("Blog data received successfully");
    } catch (error) {
      res.status(400).send("failed to save blog post");
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/authordesc", async (req, res) => {
  try {
    const authorDescschema = Joi.object({
      location: Joi.string().min(3).required(),
      github: Joi.string().min(5).required().default("no git hub account"),
      academic: Joi.string().required(),
    });

    let result = authorDescschema.validate(req.body);
    if (result.error) {
      console.log(req.body);
      return res.status(400).send(authorDescschema.error.details[0].message);
    }

    const { location, github, academic } = req.body;
    const authors = new models.authorModel({
      location,
      github,
      academic,
    });
    console.log(req.body);
    await authors.save();

    res.send("Blog published successfully with author details");
  } catch (error) {
    console.error("Error adding author details:", error);
    res.status(500).send("Internal Server Error");
  }
});

//fetching blogs from mongodb

app.get("/blogs", async (req, res) => {
  try {
    const fetchData = await models.BlogModel.find({})
    .limit(2)
  .select('authorname')
    .exec();
    
    
    return res.send(fetchData);
   
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to load data" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
