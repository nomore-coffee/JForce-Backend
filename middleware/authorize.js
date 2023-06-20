const jwt = require('jsonwebtoken');
const secretKey = "testproject"

const authorize = (roles) => {
    return (req, res, next) => {
      console.log(req.headers)
      const token = req.headers.authorization.split(" ")[1];
      console.log(token)
      if (!token) {
        return res.status(401).json({ message: 'No token provided.' ,statusCode:403});
      }
  
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token.',statusCode:403 });
        }
  
        req.user = decoded;
  
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Unauthorized role.' ,statusCode:403});
        }
  
        next();
      });
    };
  };
module.exports =authorize