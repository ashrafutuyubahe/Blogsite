const express = require("express");
const dbconn = require("./DBconfig/Dbconnection");
require("dotenv").config();
const app = express();
PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`the server is running on ${PORT} ...`));
