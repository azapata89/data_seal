# Usa una imagen de Node.js compatible
FROM node:18

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto donde correrá el frontend
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]