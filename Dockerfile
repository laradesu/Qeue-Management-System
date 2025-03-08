FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY . ./

EXPOSE  5067

CMD ["node","app.js"]