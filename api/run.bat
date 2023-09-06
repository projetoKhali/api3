@echo off

:: Run "mvn clean install" with debug and error output
mvn clean install -e -X

:: Check the exit code
if %errorlevel% neq 0 (
    echo Error compiling project
    exit /b 1
)

:: Run "mvn spring-boot:run" with debug and error output
mvn spring-boot:run -e -X

:: Exit the script
exit /b 0

