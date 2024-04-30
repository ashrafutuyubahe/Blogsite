

const express = require('express');
const router = express.Router();



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
  
  
  
  app.get(`/login/facebook,passport.authenticate('facebook',{scope:['email']}`)
  
  app.get('/facebook',passport.authenticate('facebook',(req,res)=>{
    res.redirect('/')
  }))
  
  
  app.get('/',(req,res)=>{
   res.send(req.user?req.user:'Not logged in , login with facebook');
  })
  
  
  