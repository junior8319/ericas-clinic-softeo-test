FROM node:16-alpine

WORKDIR /ericas-clinic

COPY . .

RUN npm install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]