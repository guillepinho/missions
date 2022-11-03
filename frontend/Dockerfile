FROM node:14-alpine

WORKDIR /frontend

EXPOSE 3000

ADD package.json .
COPY . .

RUN npm install

CMD ["npm", "start"]