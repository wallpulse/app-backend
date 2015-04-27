#!/bin/bash

sudo docker info
sudo docker pull wallpulse/app
sudo docker stop wallpulse-dev || true
sudo docker rm wallpulse-dev || true
sudo docker run -d --name wallpulse-dev --restart=on-failure:3 -e CONSUMER_KEY=$CONSUMER_KEY -e CONSUMER_SECRET=$CONSUMER_SECRET -e ACCESS_TOKEN=$ACCESS_TOKEN -e ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET -e VIRTUAL_HOST=dev.wallpul.se wallpulse/app
sudo docker rmi $(sudo docker images -q -f dangling=true) || true
