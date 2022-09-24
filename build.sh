#!/bin/bash

SERVER_BUILD='./server/build'
CLIENT_BUILD_IN_SERVER='./server/client'
CLIENT_BUILD='./client/build'

if [ -d ${SERVER_BUILD} ]; then
    rm -rf ${SERVER_BUILD}
fi
if [ -d ${CLIENT_BUILD} ]; then
    rm -rf ${CLIENT_BUILD}
fi
if [ -d ${CLIENT_BUILD_IN_SERVER} ]; then
    rm -rf ${CLIENT_BUILD_IN_SERVER}
fi

cd ./server

# Install dependencies
yarn

# Compile the file from Typescript to ES5
./node_modules/.bin/tsc

# Copy the folders who was not moved during the Typescript compilation
cp -rf ./app/locale ./build
mkdir /build/core/mailer
cp -rf ./app/core/mailer/templates ./build/core/mailer

cd ../client

yarn

yarn build

cp -rf ./build ../server/client

cd ../server/

cp .env.prod build/.env.prod

# NODE_ENV=production pm2 start build/index.js --name=react-node

# For docker
# cp -r ./package.json /home
# cp -rf ./build /home
# cp -rf ./client /home
