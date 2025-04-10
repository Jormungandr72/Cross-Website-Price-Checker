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
from fetch.config import fake_store_api

class FetchProductData:
    """ Class to fetch product data from a store API and sync it to Supabase. """
    def __init__(self, api_url):
        """ Initialize the class with API URLs and Supabase key. """
        self.store_api_url = api_url

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

if __name__ == "__main__":
    store_api_url = fake_store_api
    print(store_api_url)

        