import os
from dotenv import load_dotenv, dotenv_values
import requests
import json

"""
-------------------------------------------------------------------------------
Program:    NexarClient.py
Author:     Patrick J. McGranahan
Date:       03.24.2025
Language:   python
Purpose:    The purpose of this code is to collect data from the Nexar API for 
            use in Price Scout.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
PJM  03.24.2025     Created the getToken() method. Added relevant imports 
                    (requests, json). 
PJM  03.24.2025     Updated defualt constructor to initialize class variables
                    based on the root directory .env file. 
PJM  03.24.2025     Added imports related to accessing enviromental variables.
PJM  03.24.2025     Added fields required to access the Nexar API.
PJM  03.24.2025     Created NexarClient.py and added default constructor.
-------------------------------------------------------------------------------
"""
class NexarClient:
    # Data Fields

    # Stored in root directory .env
    _client_id = ""
    _client_secret = ""
    _username = ""
    _password = ""

    # Constructor
    def __init__(self):
        """
        Default Constructor. Loads enviromental variables from root directory
        and initializes class variables.
        """
        load_dotenv()
        self._client_id = os.getenv("NEXAR_CLIENT_ID")
        self._client_secret = os.getenv("NEXAR_CLIENT_SECRET")
        self._username = os.getenv("NEXAR_USERNAME")
        self._password = os.getenv("NEXAR_PASSWORD")

    # Methods
    def getToken(self):
        """
        Returns the Nexar token based on the client id and secret provided.
        Returns:
            array: 
        """