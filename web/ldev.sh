#!/bin/bash

# Set environment variable in .env file
echo "VITE_BACKEND_URL=http://127.0.0.1:8080" > .env

# Install dependencies and run the development server
npm i && npm run dev
