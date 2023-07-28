// middleware/authenticateToken.js
const jwt = require("jsonwebtoken");
const secretKey = "NPS2023"; // Chave secreta usada para verificar o token JWT

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
