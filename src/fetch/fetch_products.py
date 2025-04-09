"""
-------------------------------------------------------------------------------
Program:    fetch_products.py
Author:     Justin Clark
Date:       2025-04-09
Language:   python 3.12.9
Purpose:    Fetch product data from the database and save to a supabase.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC 2025-04-09       Created the file and added initial code to fetch products from the database.
-------------------------------------------------------------------------------
"""

import requests
import dotenv
import os

class ProductDataSync:
    """ Class to fetch product data from a store API and sync it to Supabase. """
    def __init__(self, api_url, supabase_url, supabase_key):
        """ Initialize the class with API URLs and Supabase key. """
        self.store_api_url = api_url
        self.supabase_url = supabase_url
        self.supabase_key = supabase_key

    def fetch_store_data(self):
        """ Fetch data from the store API. """
        try:
            response = requests.get(self.store_api_url)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error fetching data from store API: {response.status_code}")
                return None
        except requests.RequestException as e:
            print(f"Request failed: {e}")
            return None
        
    def sync_data_to_supabase(self, data):
        """ syncronize data to Supabase. """
        headers = {
            "apikey" : self.supabase_key,
            "Authorization" : f"Bearer {self.supabase_key}",
            "Content-Type" : "application/json",
        }

        # payload = {
        #     "data": data,
        # }

        supabase_rpc_url = f"{self.supabase_url}rest/v1/rpc/sync_data"
        print(f"Supabase RPC URL: {supabase_rpc_url}")

        try:
            response = requests.post(supabase_rpc_url, headers=headers)

            if response.status_code == 200:
                print("Data synced successfully to Supabase.")
            else:
                print(f"Error syncing data to Supabase: {response.status_code}")
        except requests.RequestException as e:
            print(f"Request failed: {e}")

if __name__ == "__main__":
    dotenv.load_dotenv()

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")

    ProductDataSync = ProductDataSync(
        api_url = "https://fakestoreapi.com/products",
        supabase_url= supabase_url,
        supabase_key = supabase_key,
    )

    # data = ProductDataSync.fetch_store_data()
    data = [{
        "id": 1,
        "title": "Product Title",
        "price": 19.99,
        "description": "Product Description",
        "category": "Category",
        "image": "https://example.com/image.jpg"
    }]

    if data:
        print(data[0]["id"])
        print(data[0]["title"])
        print(data[0]["price"])
        print(data[0]["description"])
        print(data[0]["category"])
        print(data[0]["image"])

        ProductDataSync.sync_data_to_supabase(data)
    else:
        print("No data fetched from the store API.")



        