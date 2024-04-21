
const express = require('express');
const logOutUser = require('../controllers/logout');
const router = express.Router();
const logOut =require('../controllers/logout');

router.get('/logout',logOut);
module.exports =router;