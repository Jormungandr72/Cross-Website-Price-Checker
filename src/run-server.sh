#!/bin/bash

# This script is used to build the react client and start the server.

# Exit immeditely if a command exits with a non-zero status
set -e

echo "Checking for npm and python..."
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install npm."
    exit
fi
if ! command -v python3 &> /dev/null
then
    echo "python3 could not be found. Please install python3."
    exit
fi
if ! command -v pip3 &> /dev/null
then
    echo "pip3 could not be found. Please install pip3."
    exit
fi

echo "Building the react client..."
cd ./react
npm run build

echo "React build complete. Starting the server..."
cd ../
python manage.py runserver

