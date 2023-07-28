# Use uma imagem base do Node.js
FROM node:14

# Crie o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos necessários para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos para o contêiner
COPY . .

# Exponha a porta que a API estará rodando
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "start"]