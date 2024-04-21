
const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log(authHeader);
      return res.status(401).send("Unauthorized: Missing or invalid token");
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