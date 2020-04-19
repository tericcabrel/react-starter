#!/bin/sh

docker-compose -f ${ENV_FOLDER}/dist/docker-compose.yml down

docker-compose -f ${ENV_FOLDER}/dist/docker-compose.yml up -d --build
