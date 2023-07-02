FROM node:16-alpine as development

WORKDIR /app

COPY ./ ./

RUN npm ci

RUN npm run build

FROM node:16-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=development /app/dist/ ./dist/
COPY .env.production ./.env

EXPOSE 5001

CMD [ "node", "dist/src/main.js" ]