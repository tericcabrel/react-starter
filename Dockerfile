# This file is written assuming we are in a folder containing two subfolders
# `build`: Server file ready for production
# `client`: Client file ready for production
FROM mhart/alpine-node:10.16.3

# Node Alpine doesn't contains bash (/bin/bash)
RUN apk update && apk add bash && rm -rf /var/cache/apk/*

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN mkdir -p /home/www && chmod -R 777 /home/www

WORKDIR /home/www

COPY . .

RUN chmod +x wait-for-it.sh && npm install --no-cache --frozen-lockfile --production

EXPOSE 7430

CMD ["./wait-for-it.sh", "mongodb:27017", "-t", "15", "--", "node", "build/index.js"]

# docker build -t mern-starter:prod .
# docker run -v ${PWD}/db:/data -p 27000:27017 --name mongomern --env-file ./mongo.env rm mongo
# docker run -v ${PWD}:/home/www/public -p 7430:7430 --rm --env-file ./server.env --link mongomern:mongodb mern-starter:prod
