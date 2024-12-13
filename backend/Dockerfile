FROM node:alpine as build

RUN apk add openssl

WORKDIR /app
COPY . .
RUN npm i
RUN npx prisma generate

RUN chmod 755 start.sh
EXPOSE 3000
# CMD ["npm", "run", "push", "&&", "npm", "run", "start"]
CMD ["npm", "run", "start"]