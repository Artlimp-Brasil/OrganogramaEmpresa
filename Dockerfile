# Etapa 1: build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_ORGANOGRAMA_API_URL
ARG VITE_N8N_HEADER

ENV VITE_ORGANOGRAMA_API_URL=$VITE_ORGANOGRAMA_API_URL
ENV VITE_N8N_HEADER=$VITE_N8N_HEADER


RUN npm run build

# Etapa 2: servir com nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]