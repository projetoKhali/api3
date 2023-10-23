#!/bin/bash

# Function to build the project
build() {
    echo "Building the SpringBoot BackEnd..."
    mvn clean install -e -X
}

# Function to run the Spring Boot application
run() {
    echo "Loading the environment variables for the SpringBoot BackEnd..."
    export $(cat .env | xargs)
    echo "Starting execution of the SpringBoot BackEnd..."
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
