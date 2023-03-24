FROM node:18

COPY package*.json ./

RUN npm cache clean --force

RUN npm i

COPY . .

ADD . . 

EXPOSE 3000

CMD npm run start