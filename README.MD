# API - Documentação

## Descrição

Essa é uma API desenvolvida em Node.js utilizando o framework Express.js. Ela permite a autenticação de usuários, salvamento e consulta de dados em um banco de dados MySQL.

## Requisitos

Antes de executar a API, certifique-se de que você tenha instalado os seguintes softwares:

- Node.js (versão 12 ou superior)
- MySQL (ou outro banco de dados compatível, se preferir fazer a substituição no código)

## Configuração

 Clone o repositório em sua máquina:

```bash
git clone https://github.com/fabiorvs/ApiNPS.git
cd ApiNPS
npm install
```
Crie um arquivo `.env` na raiz do projeto com as seguintes informações:

DB_HOST=seu-host-do-banco-de-dados
DB_USER=seu-usuario-do-banco-de-dados
DB_PASS=sua-senha-do-banco-de-dados
DB_NAME=nome-do-banco-de-dados
SECRET_KEY=sua-chave-secreta-para-o-jwt

Execute a aplicação
```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## Documentação

A documentação da API foi gerada usando Swagger e está disponível em `http://localhost:3000/api-docs` quando a API está em execução. Lá você encontrará mais informações sobre os endpoints e como utilizá-los.

## Contribuição

Se você encontrar algum problema ou tiver alguma sugestão para melhorar esta API, sinta-se à vontade para abrir uma issue ou enviar um pull request. Sua contribuição é bem-vinda!