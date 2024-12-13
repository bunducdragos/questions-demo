[Demo](https://demo.dragos.gg)

# Requirements

- node & npm
- docker & docker compose

# Dev

- clone this repo and run `cd questions-demo`
- rename .env.example into .env and add your postgresql db url
- run the following commands in a new temrinal:
  - `cd backend`
  - `npm i`
  - `npx prisma generate`
  - `npx prisma db push`
  - `npm run start`
- run the following commands in another terminal
  - `cd frontend`
  - `npm i`
  - `npm run dev`

# Prod

- clone this repo and run `cd questions-demo`
- edit frontend/nginx.conf line 13 with the local ip of the server
- run `docker compose up -d`

# Issues

- no real auth and authorization
- search doesn't have debounche, if you are fast enough you will get an old request as a response rendered
- req.body passed directly to the db query
- no sanatization, vulnerable to sql injection
- no server side validation of user input
- missing filtering option

# Design decisions

- prisma orm because it is fast to get started with no boilerplate
- postgresql because it has native full text search
- mantine because had all the components i needed to build fast and 0 setup
- docker because everything i work on i dockerize it and helps me to contain each app in it's own little box
