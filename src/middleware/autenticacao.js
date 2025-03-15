// Middleware para verificar o token JWT
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Pega o token do cabeçalho "Authorization"

  if (!token) {
    return res.status(403).json({ message: "Acesso negado, token não fornecido!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Adiciona o usuário decodificado ao req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido!" });
  }
};

module.exports = verificarToken;
