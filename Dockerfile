FROM node:20

WORKDIR /app

COPY server /app
RUN npm ci

COPY build /app/build

CMD ["node", "./serve.js"]

EXPOSE 3000