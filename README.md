# Price-Scout

A system design and analysis class project.

## Description

PriceScout is dedicated to empowering smart shoppers by providing a seamless, web-based platform for real-time price comparison across major retailers. Our goal is to help users make informed purchasing decisions by offering accurate, up-to-date pricing insights. With the ability to track and monitor up to 10 selected items, PriceScout ensures users stay ahead of market trends, maximizing savings and convenience.

## Table of Contents

> - [Installation](#installation)
> - [Usage](#Usage)
> - [License](#License)

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/Jormungandr72/Cross-Website-Price-Checker.git
```

### 2. Install dependencies

React dependencies:
```bash
cd ./Cross-Website-Price-Checker/src/react
npm install
```

Django

```bash
cd backend
pip install django
pip install -r requirements.txt
```

3. Set environment variables in .env file(s):
- Cross-Website-Price-Checker/src/react/.env
- Cross-Website-Price-Checker/src/.env

React .env
```bash
> For Google OAuth
REACT_APP_CLIENT_ID=
```

Django .env
```bash
SUPABASE_URL=
SUPABASE_KEY=
```

4. Start the application:

React:
```bash
cd Cross-Website-Price-Checker/src/react
npm run build
```

Django, serving react:
```bash
cd backend
python manage.py runserver (optional)[ip:port_number]
```

## Usage

> After building the react app and starting the Django server, head to the ip address you supplied to runserver, unless you didn't specify one then the default is... 
```
localhost:8000
```

<!-- Features:... -->

## License

This project is licensed under...
