const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para gerenciamento de login
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/login", AuthController.login);


router.post('/add', AuthController.addUser);

module.exports = router;
