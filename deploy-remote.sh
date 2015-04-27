#!/bin/bash

docker info
docker pull wallpulse/app
docker stop wallpulse-dev || true
docker rm wallpulse-dev || true
docker run -d --name wallpulse-dev --restart=on-failure:3 -e VIRTUAL_HOST=dev.wallpul.se wallpulse/app
docker rmi $(docker images -q -f dangling=true) || true
