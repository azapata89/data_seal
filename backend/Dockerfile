# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Instala nodemon globalmente
RUN npm install -g nodemon

# Expone el puerto del backend
EXPOSE 3000

# Comando para iniciar el servidor con nodemon
CMD ["npm", "start"]