import os
from supabase import create_client, Client
from dotenv import load_dotenv

"""
-------------------------------------------------------------------------------
Program:    SupabaseClient.py
Author:     Steven Longhofer
Date:       02/25/2025
Language:   python
Purpose:    Initialzes a supabase client to communicate with.
-------------------------------------------------------------------------------
Change Log:
Who  When          What
PJM 04.03.2025     Changed documentation structure and clarified the purpose of
                   this class.
PJM 04.03.2025     Refactored current initialization code into a default
                   constructor.
PJM 04.03.2025     Began restructuring file, made class SupabaseClient.
PJM 04.03.2025     Renamed supabase_client.py to SupabaseClient.py.
SL  02.25.2025     Created initialization code
-------------------------------------------------------------------------------
"""
class SupabaseClient:

    def __init__(self):
        # Load environment variables from .env file
        load_dotenv()
        
        # Retrieve Supabase URL and key from environment variables
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_KEY")

        # Initialize Supabase client
        self.supabase_client = create_client(self.supabase_url, self.supabase_key)

    def getReactData(self):
        """
        Gets data from supabase and returns a json file for use in
        the react frontend.
        Returns:
            json: a json object with store name, product name, and price
        """
        store_names = (
            self.supabase_client.table("stores")
            .select("store_name")
            .execute()
        )