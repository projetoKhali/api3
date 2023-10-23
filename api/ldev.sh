#!/bin/bash

# Function to build the project
build() {
    echo "Building the project..."
    mvn clean install -e -X
}

# Function to run the Spring Boot application
run() {
    export $(cat .env | xargs)
    mvn spring-boot:run -e -X
}

# Check for arguments and execute corresponding actions
if [ "$1" == "build" ]; then
    build
elif [ "$1" == "run" ]; then
    run
else
    # If no arguments are provided, run both build and run
    build
    run
fi
