"""
-------------------------------------------------------------------------------
Program:    supabase.py
Author:     Steven Longhofer
Date:       02/25/2025
Language:   python
Purpose:    initialze a supabase client to communicate with
-------------------------------------------------------------------------------
Change Log:
Who  When           What
SL  02.25.2025     Created initialization code
-------------------------------------------------------------------------------
"""

from supabase import create_client, Client
from django.conf import settings

# Initialize Supabase client
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
