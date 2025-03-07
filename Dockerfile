FROM node:18-alpine as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm install -f

COPY client /app/client

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install -f

COPY server /app

COPY --from=client /app/client/build /app/client

EXPOSE 80

CMD ["npm", "start"]