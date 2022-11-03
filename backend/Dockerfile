FROM node:14-alpine

WORKDIR /backend

EXPOSE 3001

ADD package.json .
COPY . .

RUN npm install

CMD ["npm", "start"]