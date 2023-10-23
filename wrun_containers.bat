@echo off

REM Set environment variable in .env file
echo VITE_BACKEND_URL=http://127.0.0.1:8080 > .env

REM Start docker-compose
docker-compose up --build -d
