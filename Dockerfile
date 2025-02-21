FROM node:16

WORKDIR /app


COPY server/package*.json ./


RUN npm install


COPY . .


EXPOSE 3000


CMD ["node", "app"]
