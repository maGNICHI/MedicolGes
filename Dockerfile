FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY ./MediColGes_Backend/package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]