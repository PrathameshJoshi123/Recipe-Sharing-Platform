const jwt = require('jsonwebtoken');
const UserModel = require('./model/User'); 

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, 'secret');
      const user = await UserModel.findById(decoded.userId).select('-password'); 
    
      if (!user) {
        return res.status(404).send("not found"); // User not found
      }

      req.user = user;
      next();
    } catch (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
  } else {
    res.sendStatus(401); // Unauthorized if token is missing
  }
};

module.exports = authenticateJWT;
