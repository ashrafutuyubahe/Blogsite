const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const dbconn = require("./DBconfig/Dbconnection");
const usermodel = require("./models/userschema");
const bodyParser = require("body-parser");
const Joi = require("joi");
const models = require("./models/blogschema");
const homeroutes = require("./routes/homeRoutes");
const path = require("path");
const Mongoose = require("mongoose");
const imagehandle = require("./routes/imageupload");
const logOutUser= require('./routes/logout');
const authenticateToken= require('./middlewares/authmiddleware');
require("dotenv").config();
const secretKey= 'privatekey'
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api", homeroutes);
//image uplaod
app.use("/", imagehandle);
// app.use('/',logOutUser);

app.get("/register", (req, res) => {
  res.render("register");
});


// const dataof= req.body.blogid;  or const  refactor= _.pick(blogid,re.body);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
    
    const { username, useremail, userpassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(userpassword, salt);

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




app.get("/login", async (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;

    const user = await usermodel.findOne({ useremail });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(userpassword, user.userpassword);
    if (!validPassword) return res.sendStatus(400);

    const token = jwt.sign({ username: user.username }, secretKey);

    
    res.cookie("Authorization", `Bearer ${token}`);
    res.cookie("Access-Control-Expose-Headers", "Authorization");

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/logout',async(req,res)=>{
  try{
    
res.clearCookie('authorisation');
res.redirect('/')
  }catch(err){
    res.send('error:',err);
  }
})

// //emplemting facebook  authentication
// const FACEBOOK_CLIENT_ID='754590690115206';
//  const FACEBOOK_CLIENT_SECRETE='97d8096674a91ab98a736cd0154e11e0';
 passport.use(new FacebookStrategy({
  ClientID:'754590690115206',
  ClientSecrete:'97d8096674a91ab98a736cd0154e11e0',
  callbackURL:"/facebook",
  profileFields:['emails','diplayName','name','picture']
 },(accessToken,refreshToken,profile,callback)=>{
  callback(null,profile)
 }))

 passport.serializeUser((user,callback)=>{
  callback(null,user)
 })
  
 
 passport.deserializeUser((user,callback)=>{
  callback(null,user)
 })

 app.use(session({
  secret: 'ashrafuwow',
  resave: false,
  saveUninitialized: true
}));



app.get("/login/facebook,passport.authenticate('facebook',{scope:['email']})

app.get('/facebook',passport.authenticate('facebook',(req,res)=>{
  res.redirect('/')
}))


app.get('/',(req,res)=>{
 res.send(req.user?req.user:'Not logged in , login with facebook');
})







app.get("/createblog", authenticateToken, async (req, res) => {
  try {
    const username = req.username;
    const validateUser = await usermodel.findOne({ username });
    if (!validateUser) return res.send("Please log in before creating Blog");
    res.render("createblog");
  } catch (error) {
    console.error("Error during authentication:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/createblog", async (req, res) => {
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
    const wholeBlog = await models.BlogModel.findById(blogid).lean();

    if (!wholeBlog) {
      return res.status(404).json("Blog not found");
    }

    res.render("displayblog", { blog: wholeBlog });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
});

//delete api

app.delete("/deleteblog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findBlogExist = await models.BlogModel.findOne({ id });
    if (!findBlogExist) return res.status(404).send(`blog doesn't exists`);

    console.log(findBlogExist);
    const deleteblog = models.BlogModel.findByIdAndDelete({ id });
    if (!deleteblog)
      return res.status(400).send("sorry !!! the blog was deleted");
    return res.send("blog  is deleted ");
  } catch (err) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
});

//update api
app.put("/updateblog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { authorname, blogtitle, blogdescription, blogcontent } = req.body;
    const findBlogExist = await models.BlogModel.findById(id);

    if (!findBlogExist) return res.status(404).send(`Blog doesn't exist`);

    const updateBlog = await models.BlogModel.findByIdAndUpdate(id, {
      authorname,
      blogtitle,
      blogdescription,
      blogcontent,
    });

    if (!updateBlog) return res.status(401).send("Failed to update the blog");

    return res.send("Blog is updated");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
