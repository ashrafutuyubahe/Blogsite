
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const secretKey= 'privatekey'
function authenticateToken(req, res, next) {
const authHeader = req.cookies["Authorization"];

if(!authHeader){
    res.send('you have to log in first');
    res.render('login');

}
    
    
    const token = authHeader.split(" ")[1]; 
    try {
      const decoded = jwt.verify(token, secretKey);
      req.username = decoded.username;
      next();
    } catch (error) {
      console.error("Error verifying token:", error.message);
      res.status(403).send("Invalid token");
    }
  }
  

module.exports= authenticateToken;