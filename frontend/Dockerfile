FROM node:16-alpine

# Configurar diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar arquivos do projeto
COPY . .

# Corrigir permissões para o diretório node_modules
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Definir usuário node para executar a aplicação
USER node

# Expor porta 3000
EXPOSE 3000

# Iniciar aplicação React
CMD ["npm", "start"]