FROM node:alpine as build

RUN apk add openssl

WORKDIR /app
COPY . .
RUN npm i

EXPOSE 3000
CMD ["sh", "start.sh"]