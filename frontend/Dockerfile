# Frontend Dockerfile
FROM node:16 as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Production server setup
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
