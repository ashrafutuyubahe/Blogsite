const { error } = require('console');
const   mongoose = require('mongoose');
const userSchema=   mongoose.connect('mongodb://localhost/Blogsite')
.then(console.log('the connection  to mongodb is set... '))
.catch(console.log('error while stting connection to mongdb'));
