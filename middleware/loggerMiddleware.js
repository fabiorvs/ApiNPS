const db = require("../config/db");

function loggerMiddleware(req, res, next) {
  const { method, url, body, headers } = req;

  const requestBody = body ? JSON.stringify(body) : null;
  const requestHeaders = headers ? JSON.stringify(headers) : null;

  const sql =
    "INSERT INTO request_logs (method, url, body, headers) VALUES (?, ?, ?, ?)";
  db.promise()
    .execute(sql, [method, url, requestBody, requestHeaders])
    .then(() => next())
    .catch((err) => {
      console.error("Erro ao salvar o log da requisição:", err);
      res.sendStatus(500);
    });
}

module.exports = loggerMiddleware;
