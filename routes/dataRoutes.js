// routes/dataRoutes.js
const express = require("express");
const router = express.Router();
const DataController = require("../controllers/dataController");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Endpoints para gerenciamento de dados
 */

/**
 * @swagger
 * /data/save:
 *   post:
 *     summary: Salvar dados na API.
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *               visual:
 *                 type: number
 *               recursos:
 *                 type: number
 *               experiencia:
 *                 type: number
 *               curso:
 *                 type: string
 *               usuario:
 *                 type: string
 *             required:
 *               - score
 *               - visual
 *               - recursos
 *               - experiencia
 *               - curso
 *               - usuario
 *     responses:
 *       200:
 *         description: Dados salvos com sucesso.
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/save", authenticateToken, DataController.saveData);


router.get("/consultar-dados", authenticateToken, DataController.getData);

/**
 * @swagger
 * /data/uuid:
 *   post:
 *     summary: Consultar dados por Uuid.
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *             required:
 *               - uuid
 *     responses:
 *       200:
 *         description: Dados consultados com sucesso.
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post(
  "/uuid",
  authenticateToken,
  DataController.getDataByUuid
);

module.exports = router;
