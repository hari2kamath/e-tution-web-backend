FROM node:10

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

#test

EXPOSE 80 3000

RUN npm run build

CMD [ "npm", "start" ]
