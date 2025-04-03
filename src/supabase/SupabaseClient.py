"""
-------------------------------------------------------------------------------
Program:    SupabaseClient.py
Author:     Steven Longhofer
Date:       02/25/2025
Language:   python
Purpose:    initialze a supabase client to communicate with
-------------------------------------------------------------------------------
Change Log:
Who  When          What
PJM 04.03.2025     Renamed supabase_client.py to SupabaseClient.py.
SL  02.25.2025     Created initialization code
-------------------------------------------------------------------------------
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve Supabase URL and key from environment variables
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)
