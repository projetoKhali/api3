#!/bin/sh
docker build -t khali_api3_api .
docker run --name api -ti khali_api3_api
docker exec -ti api /bin/sh
