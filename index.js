// index.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const loggerMiddleware = require('./middleware/loggerMiddleware');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Utilizando variável de ambiente ou a porta 3000 por padrão


// Middleware para transformar o corpo da requisição em JSON
app.use(bodyParser.json());

// Log
app.use(loggerMiddleware);

// Rotas de autenticação
app.use("/auth", authRoutes);

// Rotas para manipulação dos dados
app.use("/data", dataRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
