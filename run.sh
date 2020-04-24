#!/bin/sh

docker-compose -f ${ENV_FOLDER}/docker-compose.yml down

docker-compose -f ${ENV_FOLDER}/docker-compose.yml up -d --build
