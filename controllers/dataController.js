const User = require("../models/userModel");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid"); // Importa a função para gerar UUID v4

class DataController {
  static saveData(req, res) {
    const {
      pergunta1,
      pergunta2,
      pergunta3,
      pergunta4,
      pergunta5,
      pergunta6,
      pergunta7,
      curso,
      usuario,
    } = req.body;
    const userId = req.user.id;

    const uuid = uuidv4(); // Gera um UUID v4 único

    // Aqui você deve inserir os dados na base de dados MySQL, incluindo o UUID
    // Exemplo de consulta SQL (utilizando a biblioteca mysql2/promise):
    const sql =
      "INSERT INTO respostas (uuid, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, pergunta7, curso, usuario , user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ?)";
    db.promise()
      .execute(sql, [
        uuid,
        pergunta1,
        pergunta2,
        pergunta3,
        pergunta4,
        pergunta5,
        pergunta6,
        pergunta7,
        curso,
        usuario,
        userId,
      ])
      .then(() => {
        // Após salvar, consultar os dados recém-inseridos
        const selectSql =
          "SELECT * FROM respostas WHERE user_id = ? AND uuid = ?";
        return db.promise().execute(selectSql, [userId, uuid]);
      })
      .then(([rows]) => {
        // rows[0] contém os dados recém-inseridos
        const dadosInseridos = rows[0];
        res.json(dadosInseridos); // Retorna os dados salvos em formato JSON
      })
      .catch((err) => {
        console.error("Erro ao salvar os dados:", err);
        res.sendStatus(500);
      });
  }

  static getData(req, res) {
    const userId = req.user.id;

    // Aqui você deve realizar a consulta na base de dados MySQL para obter os dados salvos pelo usuário
    // Exemplo de consulta SQL (utilizando a biblioteca mysql2/promise):
    const sql =
      "SELECT uuid, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, pergunta7, curso, usuario FROM respostas WHERE user_id = ?";
    db.promise()
      .execute(sql, [userId])
      .then(([rows]) => {
        res.json(rows); // Retorna os dados encontrados em formato JSON
      })
      .catch((err) => {
        console.error("Erro ao consultar os dados:", err);
        res.sendStatus(500);
      });
  }

  static getDataByUuid(req, res) {
    const userId = req.user.id;
    const { uuid } = req.body;

    const sql =
      "SELECT uuid, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, pergunta7, curso, usuario FROM respostas WHERE uuid = ?";
    db.promise()
      .execute(sql, [uuid])
      .then(([rows]) => {
        res.json(rows); // Retorna os dados encontrados em formato JSON
      })
      .catch((err) => {
        console.error("Erro ao consultar os dados:", err);
        res.sendStatus(500);
      });
  }
}

module.exports = DataController;
