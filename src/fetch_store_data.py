import asyncio
import asyncpg
import requests

# for environment variables
from django.conf import settings

# API endpoint(s)
API_URL = "https://myapi.com/products"

# Database connect config
DB_CONFIG = {
    "user": "",
    "password": "",
    "database": "",
    "host": "",
    "port": 5432
}

async def insert_into_db(data):
    """ Insert API data into PostGreSQL"""
    connection = await asyncpg.connect(**DB_CONFIG)

    try:
        async with connection.transaction():
            for item in data:
                await connection.execute(
                    """
                    INSERT INTO products (id, name, price, category)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (id) DO UPDATE
                    SET name = EXCLUDED.name, price = EXCLUDED.price, category = EXCLUDED.category;
                    """,
                    item["id"], item["name"], item['price'], item['category']
                )

    finally:
        await connection.close()

def fetch_api_data():
    """ Fetches data from external api"""
    response = requests.get(API_URL)

    if response.status_code == 200:
        return response.json
    else:
        print(f"{response.status_code} : {response.text}")
        return []
    
async def main():
    """ main function to fetch and store api data"""
    data = fetch_api_data()

    if data:
        await insert_into_db(data)

if __name__ == "__main__":
    asyncio.run(main())
