import requests

class SyncSupabase:
    """ SyncSupabase class to handle synchronization with Supabase. """
    def __init__(self, supabase_url, supabase_key, rpc_function, payload=None):
        """ Initialize the SyncSupabase class with Supabase URL and key. """
        self.supabase_url = supabase_url
        self.supabase_key = supabase_key
        self.rpc_function = rpc_function
        self.payload = payload

    def sync_data_to_supabase(self):
        """ Sync data to Supabase. """
        headers = {
            "apikey" : self.supabase_key,
            "Authorization" : f"Bearer {self.supabase_key}",
            "Content-Type" : "application/json",
        }

        supabase_rpc_url = f"{self.supabase_url}rest/v1/rpc/{self.rpc_function}"

        try:
            if self.payload:
                response = requests.post(supabase_rpc_url, headers=headers, json=self.payload)
            else:
                response = requests.post(supabase_rpc_url, headers=headers)

            if response.status_code == 200:
                print("Data synced successfully to Supabase.")
            else:
                print(f"Error syncing data to Supabase: {response.status_code}")
        except requests.RequestException as e:
            print(f"Request failed: {e}")