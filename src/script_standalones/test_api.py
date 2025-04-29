from dotenv import load_dotenv
import os
import requests
import json

class TestAPI:
    def __init__(self, env_file: str = '.env'):
        # Load environment variables
        self.BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        load_dotenv(os.path.join(self.BASE_DIR, 'shared-config', env_file))

        # Get the Supabase URL and key from environment variables
        self.SUPABASE_URL = os.getenv('SUPABASE_URL')
        self.SUPABASE_KEY = os.getenv('SUPABASE_KEY')

        self.REQUEST_URL = f"{self.SUPABASE_URL}/rest/v1/rpc"
        self.headers = {
            "apikey": self.SUPABASE_KEY,
            "Authorization": f"Bearer {self.SUPABASE_KEY}",
            "Content-Type": "application/json"
        }

    def fetch_stores(self):
        """Fetch stores data from Supabase"""
        try:
            response = requests.post(f"{self.REQUEST_URL}/get_stores", headers=self.headers, timeout=10)
            print(response.status_code)
            if response.status_code == 200:
                try:
                    stores_data = response.json()
                    print(stores_data)
                    return stores_data
                except json.JSONDecodeError as jsonerror:
                    print(f"Error parsing JSON response: {jsonerror}")
                    return None
            else:
                print("No stores found!")
                return None
        except requests.Timeout:
            print("Request to Supabase URL timed out")
        except requests.HTTPError as http_error:
            print(f"HTTP error occurred: {http_error}")
        except requests.RequestException as request_error:
            print(f"Error with the request: {request_error}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

# Usage example:
if __name__ == '__main__':
    client = TestAPI()
    stores_data = client.fetch_stores()
