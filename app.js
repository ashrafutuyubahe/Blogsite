const express = require("express");
const dbconn = require("./DBconfig/Dbconnection");
const usermodel = require("./models/userschema");
const bodyParser = require("body-parser");
const ejs= require('ejs');

const path = require("path");
const fs = require("fs");
const { prototype } = require("events");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
      const { username, useremail, userpassword } = req.body;
      const newUser = new usermodel({
          username: username,
          useremail: useremail,
          userpassword: userpassword
      });
      const savedUser = await newUser.save();
      console.log("User saved successfully:", savedUser);
      res.redirect("/");
  } catch (error) {
      console.error("Error during registration:", error.message);
      res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));