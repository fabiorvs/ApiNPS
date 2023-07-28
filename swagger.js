// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API NPS",
      version: "1.0.0",
      description: "Documentação da API NPS",
    },
    servers: [
      {
        url: "http://localhost:3000", // Substitua pelo URL da sua API em produção, se necessário
      },
    ],
  },
  apis: ["./routes/*.js"], // Coloque o caminho dos arquivos de rota que você deseja incluir na documentação do Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;
