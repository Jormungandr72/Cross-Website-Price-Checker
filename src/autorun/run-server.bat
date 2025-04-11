@echo off
REM This script is used to run the Django server and build the React app
setlocal enabledelayedexpansion

echo =========================
echo Running Django server and building React app...
echo =========================

REM cd to ../react/ then run npm run build
echo ==========================
echo Building React app...
echo ==========================
if exist "..\react" (
    cd ..\react\
    call npm install
    cd ..\react\
    call npm run build
    echo React app built successfully.
) else (
   echo React app directory not found.
)

echo =========================
echo Activating virtual environment...
echo =========================
REM cd to .\venv\ then activate the virtual environment
if exist "..\venv\Scripts\activate.bat" (
    call ..\venv\Scripts\activate.bat
    echo Virtual environment activated.
) else (
    echo Virtual environment directory not found. Making a virtual environment now...
    python -m venv ..\venv
    echo Virtual environment created.
    call ..\venv\Scripts\activate.bat
    echo Virtual environment activated.
)

REM cd to \src then run python manage.py runserver
echo =========================
echo Running Django server...
echo =========================
cd ..\
if exist "manage.py" (
    echo Django manage.py found, running server...
    python manage.py runserver
) else (
    echo manage.py not found in the Django directory.
    echo Please ensure you are in the correct directory.
    echo Exiting script...
    echo =========================
    echo Closed Django server.
    echo =========================
    exit /b 1
)

echo =========================
echo Script exited uexpectedly.
echo =========================
