const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs= require('ejs')
const dbconn = require("./DBconfig/Dbconnection");
const usermodel = require("./models/userschema");
const bodyParser = require("body-parser");
const session = require("express-session");
const Joi = require("joi");
const models = require("./models/blogschema");
const path = require("path");
const Mongoose = require("mongoose");


require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

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

app.get("/", async (req, res) => {
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

    let user = usermodel.findOne({ useremail: req.body.useremail });
    if (user) {
      return res
        .status(400)
        .send(
          "user already registered.please register yourself with other Email "
        );
    }

    const { username, useremail, userpassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(userpassword, salt);
    console.log(hashedpassword);
    console.log(salt);

    const newUser = new usermodel({
      username: username,
      useremail: useremail,
      userpassword: hashedpassword,
    });

    const savedUser = await newUser.save();

    res.send("Registration is successfully done");
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/login", (req,res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;
     
    const user = await usermodel.findOne({ useremail });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(userpassword, user.userpassword);
    if (!validPassword) return res.status(400).send("Invalid email or password");
     const token= jwt.sign({_id:user.id,username:user.username},'privatekey');
     console.log(token)

    res.json(token);
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// //userauth
// // Middleware to verify JWT token   
// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).send('Access Denied');

//   try {
//     const decoded = jwt.verify(token, 'privatekey');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).send('Invalid Token');
//   }
// };

// // Example of a protected route
// app.get('/protected', verifyToken, (req, res) => {
//   // Access req.user to get user information
//   res.send('You are authenticated');
// });



app.get("/createblog", (req,res) => {
  res.render("createblog");
});

app.post("/createblog",async (req, res) => {
  try {
    const blogvalidateschema = Joi.object({
      authorname: Joi.string().required(),
      blogtitle: Joi.string().min(5).required(),
      blogdes: Joi.string().min(5).required(),
      blogcontent: Joi.string().min(5).required(),
      // image: Joi.string().min(5),
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

    await authors.save();

    res.send("Blog published successfully with author details");
  } catch (error) {
    console.error("Error adding author details:", error);
    res.status(500).send("Internal Server Error");
  }
});

const { ObjectId } = require("mongoose").Types;

app.get("/blogs", async (req, res) => {
  try {
    const fetchBlogs = await models.BlogModel.find({})

      .select("authorname blogtitle blogdescription date")
      .exec();

    const blogsWithId = fetchBlogs.map((blog) => ({
      _id: new ObjectId(blog._id),
      data: blog,
    }));

    return res.send(blogsWithId);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to load data" });
  }
});

app.get("/displayblog", async (req, res) => {
  try {
    const blogid = req.query.id;

    if (!Mongoose.Types.ObjectId.isValid(blogid)) {
      return res.status(400).json("Invalid blog ID");
    }

    wholeBlog = await models.BlogModel.findOne({ _id: blogid })
      .select("authorname blogtitle blogdescription blogcontent")
      .exec();

    if (!wholeBlog) {
      return res.status(404).json("Blog not found");
    }

    res.render("displayblog", { blog: wholeBlog });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
