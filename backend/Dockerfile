FROM node:alpine as build

WORKDIR /app
COPY . .
RUN npm i


EXPOSE 3000
CMD ["sh", "start.sh"]