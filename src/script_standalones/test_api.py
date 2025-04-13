from dotenv import load_dotenv
import os
import requests

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

load_dotenv(os.path.join(BASE_DIR, 'shared-config', '.env'))

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

REQUEST_URL = str(SUPABASE_URL) + '/rest/v1/rpc'
headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

try:
    response = requests.post(f"{REQUEST_URL}/get_stores", headers=headers, timeout=10)
    print(response.status_code)
    if response.status_code == 200:
        try:
            stores_data = response.json()
            print(stores_data)
        except Exception as jsonerror:
            print(f"Error parsing JSON response: {jsonerror}")
    else:
        print("No stores found!")
except requests.Timeout:
    print("Request to supabase url timed out")
except requests.HTTPError as http_error:
    print(f"Http error occurred: {http_error}")
except requests.RequestException as request_error:
    print(f"Error with the request: {request_error}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")

