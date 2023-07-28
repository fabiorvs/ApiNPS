// models/userModel.js
const db = require('../config/db');

class User {
  static findByUsername(username) {
    const sql = 'SELECT id, username, password FROM users WHERE status = "A" AND  username = ?';
    return db.promise().execute(sql, [username])
      .then(([rows]) => {
        return rows.length ? rows[0] : null;
      });
  }

  static async create(name, username, password) {
    try {
      const sql = 'INSERT INTO users (name, username, password) VALUES (?, ?, ?)';
      const [result] = await db.promise().execute(sql, [name, username, password]);
      return result.insertId; // Retorna o ID do usuário criado
    } catch (err) {
      console.error('Erro ao adicionar o usuário:', err);
      throw err;
    }
  }
  
}

module.exports = User;
