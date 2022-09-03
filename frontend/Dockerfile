FROM node:16-alpine

WORKDIR /ericas-clinic

COPY . .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]