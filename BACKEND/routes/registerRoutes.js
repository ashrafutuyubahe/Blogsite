
const express = require('express');
const router = express.Router();
const path = require('path');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const usermodel = require('../models/userschema');

router.post("/register", async (req, res) => {
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

    let user = await usermodel.findOne({ useremail: req.body.useremail });
    if (user) {
      return res.status(400).send("User already registered. Please register yourself with another email.");
    }

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

module.exports = router;
