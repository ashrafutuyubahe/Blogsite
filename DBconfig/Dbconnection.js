const { error } = require('console');
const { string } = require('joi');
const   mongoose = require('mongoose');
const { type } = require('os');
const userSchema=   mongoose.connect('mongodb://localhost:27017/Blogsite')
.then(console.log('the connection  to mongodb is set... '))
.catch((error)=>{
    console.error('error while stting connection to mongdb')
});

