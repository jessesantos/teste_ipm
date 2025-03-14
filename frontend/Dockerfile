FROM node:16-alpine as build

# Configurar diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar arquivos do projeto
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Estágio de produção usando Nginx
FROM nginx:alpine

# Copiar arquivos de build para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]