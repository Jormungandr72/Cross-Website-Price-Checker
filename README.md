# Price-Scout

A system design and analysis class project.

## Description

PriceScout is dedicated to empowering smart shoppers by providing a seamless, web-based platform for real-time price comparison across major retailers. Our goal is to help users make informed purchasing decisions by offering accurate, up-to-date pricing insights. With the ability to track and monitor up to 10 selected items, PriceScout ensures users stay ahead of market trends, maximizing savings and convenience.

## Table of Contents

- [Installation](#installation)

- [Usage](#Usage)

- [License](#License)

## Installation

1. Clone the repo:
```bash
git clone https://github.com/Jormungandr72/Cross-Website-Price-Checker.git
```

2. Install dependencies

Frontend:
```bash
cd react
npm install
```

Backend:

```bash
cd backend
pip install -r requirements.txt
```

3. Set environment variables in .env file(s):
- react env
- root env

React .env
```bash
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_KEY=

REACT_APP_CLIENT_ID=
```

Backend .env
```bash
SUPABASE_URL=
SUPABASE_KEY=
```

4. Start the application:

Frontend:
```bash
cd react
npm start
```

Backend:
```bash
cd backend
python manage.py runserver
```

## Usage

- After starting both react and django servers, go to 'http://localhost:8000'.

<!-- Features:... -->

## License

This project is licensed under...
