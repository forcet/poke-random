# Etapa 1: construir TypeScript
FROM node:23-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar solo dependencias necesarias para build
RUN npm install

# Copiar el resto del código
COPY tsconfig.json ./
COPY src ./src

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa 2: imagen final para producción
FROM node:23-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Instalar solo dependencias de producción
RUN npm install --only=production

# Exponer el puerto del servidor
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "dist/server.js"]