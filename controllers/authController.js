// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "NPS2023"; // Chave secreta para assinar e verificar o token JWT
const User = require("../models/userModel");

class AuthController {
  static login(req, res) {
    const { username, password } = req.body;

    User.findByUsername(username)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Usuário não encontrado" });
        }

        // Comparar a senha fornecida com a senha criptografada no banco de dados
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result) {
            return res.status(401).json({ error: "Senha incorreta" });
          }

          // Gerar o token JWT
          jwt.sign(
            { id: user.id, username: user.username },
            secretKey,
            (err, token) => {
              if (err) {
                return res.sendStatus(500); // Erro ao gerar o token
              }
              res.json({ token });
            }
          );
        });
      })
      .catch((err) => {
        console.error("Erro ao autenticar o usuário:", err);
        res.sendStatus(500);
      });
  }

  static async addUser(req, res) {
    const { name, username, password } = req.body;

    try {
      // Verifica se o usuário já existe no banco de dados
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: "Usuário já existe" });
      }

      // Criptografa a senha antes de armazená-la no banco de dados
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          console.error("Erro ao criar hash da senha:", err);
          return res.sendStatus(500);
        }

        try {
          const userId = await User.create(name, username, hashedPassword);
          res.json({ id: userId, name, username }); // Retorna os dados do usuário criado
        } catch (err) {
          console.error("Erro ao adicionar o usuário:", err);
          res.sendStatus(500);
        }
      });
    } catch (err) {
      console.error("Erro ao verificar usuário existente:", err);
      res.sendStatus(500);
    }
  }
}

module.exports = AuthController;
