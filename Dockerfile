FROM node:16-alpine

COPY package.json package-lock.json ./
RUN npm install
COPY private.key server.mjs .env ./
COPY api api
COPY views views

EXPOSE 3000

CMD ["node", "server.mjs"]
