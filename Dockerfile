FROM node:10-alpine

ADD . /code
WORKDIR /code

RUN npm install
RUN npm run build

CMD ["npm", "run", "serve"]
