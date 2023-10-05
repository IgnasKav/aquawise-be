FROM node:16-alpine as build

WORKDIR /app

COPY ./ ./

RUN npm ci

RUN npm run build

FROM node:16-alpine as serve

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist/ ./dist/
COPY .env.prod ./.env

EXPOSE 5002

CMD [ "npm", "run", "start:prod" ]