@echo off
setlocal

rem Check if the first argument is "build"
if "%~1" == "build" (
    call :build
)

rem Check if the first argument is "run"
if "%~1" == "run" (
    call :run
)

rem If no arguments were passed run both
if "%~1" == "" (
    call :build
    call :run
)

endlocal
exit /b 0

:build
REM Run "mvn clean install" with debug and error output
echo Building the project...
mvn clean install -e -X

REM Check the exit code
if %errorlevel% neq 0 (
    echo Error compiling project
    exit /b 1
)
exit /b 0

:run
REM Load the `.env` file to set the values for `application.properties`
echo Loading environment variables from .env file...
for /f "usebackq tokens=1,* delims==" %%i in (.env) do (
    set "%%i=%%j"
)

REM Run "mvn spring-boot:run" with debug and error output
echo Running the Spring Boot application...
mvn spring-boot:run -e -X

REM Exit the script
exit /b 0
