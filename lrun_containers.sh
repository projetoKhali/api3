#!/bin/bash

# Set environment variable in .env file
echo "VITE_BACKEND_URL=http://127.0.0.1:8000" > ./web/.env

# Start docker-compose
docker-compose up --build -d
