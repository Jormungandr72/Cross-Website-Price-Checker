import os
import json

from serpapi import GoogleSearch
import requests

class StoreProductManager:
    def __init__(self, serp_api_key):
        self.serp_api_key = serp_api_key

    def 