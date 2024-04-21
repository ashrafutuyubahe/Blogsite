
const jwt = require("jsonwebtoken");
const secretKey = "privatekey";
function authenticateToken(req, res, next) {
    const authHeader = req.cookies["Authorization"];

  
    
  console.log(authHeader)
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