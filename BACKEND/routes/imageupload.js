
const express = require('express');
const router= express.Router();
const uploads = require('../uploads');
const handleImageUplaod= require('../controllers/imageupload')


router.post('/upload', uploads.single('image'),handleImageUplaod);

module.exports= router;
  