FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

COPY .env ./

ENV PORT=$PORT 

EXPOSE $PORT

VOLUME ["/app/data"]

CMD ["npm", "start"]