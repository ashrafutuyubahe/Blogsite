const asyncHandler = require("express-async-handler");

const logOutUser= asyncHandler(async(req,res)=>{

res.clearCookie('authorisation');
res.redirect('/');
})

module.exports=logOutUser;