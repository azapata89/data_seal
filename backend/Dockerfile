# Usa la imagen oficial de Node.js
FROM node:16

# Crea y usa el directorio de la aplicación
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
COPY server.js ./

# Instala las dependencias
RUN npm install

# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación
CMD ["node", "server.js"]