// middleware/authenticateToken.js
require('dotenv').config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Falha na autenticação do token" });
    }

    req.user = decodedToken;
    next();
  });
}

module.exports = authenticateToken;
