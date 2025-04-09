#!/bin/bash

# This script is used to build the react client and start the server.

# Exit immeditely if a command exits with a non-zero status
set -e

# Check for npm and python
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

# Check for react directory
cd ./react

# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
    echo "node_modules not found. Installing dependencies..."
    npm install
fi

echo "Building the react client..."
npm run build
echo "React client built successfully."

# Check for src directory (where manage.py is located)
cd ../

# Check for manage.py
if [ ! -f "manage.py" ]; then
    echo "manage.py not found. Make sure you're in the correct directory."
    exit 1
fi

# Check for virtual environment
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Creating a new one..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi

# Check for package differences
echo "Checking for pip package differences..."
pip freeze > installed_packages.txt
if ! diff -q installed_packages.txt requirements.txt > /dev/null; then
    echo "Package differences found. Installing missing packages..."
    pip install -r requirements.txt
else
    echo "No package differences found. Check passed!"
fi

# Clean up installed_packages.txt
rm installed_packages.txt

echo "Packages up to date and virtual env startd, Starting the server..."
python manage.py runserver

