const express = require("express");
const dbconn = require("./DBconfig/Dbconnection");
const usermodel= require('./models/userschema');
const bodyparser =require('body-parser');
const path =require('path');
const fs= require('fs');
require("dotenv").config();
const app = express();
PORT = process.env.PORT || 4000;
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});



app.listen(PORT, () => console.log(`the server is running on ${PORT} ...`));
