FROM node:22.10.0-alpine.3.19

WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]