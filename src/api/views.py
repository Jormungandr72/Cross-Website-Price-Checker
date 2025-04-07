"""
-------------------------------------------------------------------------------
Program:    views.py
Author:     Justin Clark
Date:       2025-04-03
Language:   python 3.12.9
Purpose:    This file is part of the Django project and is used to handle API
            requests and responses. It contains the logic for interacting with the
            Supabase API to fetch stores and products.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC  2025-04-03     created this file to handle API requests and responses
JC  2025-04-03     added get_stores and get_products endpoints
-------------------------------------------------------------------------------
"""



# Create your views here.
from rest_framework.response import Response

from rest_framework.decorators import api_view
from django.conf import settings

import requests
from requests.exceptions import RequestException, Timeout, HTTPError

import logging

# Use the django logger instead of print, don't want users to find out how our program works
# This will return the name of the current logger, if none then create one
logger = logging.getLogger(__name__)

SUPABASE_URL = settings.SUPABASE_URL
SUPABASE_ANON_KEY = settings.SUPABASE_KEY

headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json"
}

REQUEST_URL = str(SUPABASE_URL) + '/rest/v1/rpc'

# api view decorator to inherit Response + Request classes
@api_view(['GET'])
def test_api(request):
    return Response({'message' : "Hello, World! This is a test API from the django API app."})

@api_view(['POST'])
def get_stores(request):
    """
    Fetches a list of stores from the Supabase API using a custom RPC function

    """
    try:
        # Send POST request to Supabase API
        response = requests.post(f"{REQUEST_URL}/get_stores", headers=headers, timeout=10)

        # Successful response
        if (response.status_code == 200):
            stores_data = response.json()

            # Check valid data
            if not stores_data:
                return Response({"error" : "No stores found"}, status=404)
            
            # Valid data
            return Response(response.json())
        else:
            return Response({"error" : "no stores found!"}, status=404)
    except Timeout:
        # after x amount of time
        logger.error("Request to supabase url timed out")
        return Response({"error" : "Request to supabase timed out"}, status=504)

    except HTTPError as http_error:
        # HTTP errors 400, 404, 500
        logger.error(f"Http error occurred: {http_error}")
        return Response({"error" : "http error occurred"}, status=500)

    except RequestException as request_error:
        # general request errors    
        logger.error(f"Error with the request: {request_error}")

    except Exception as e:
        # The rest that wasn't caught before
        logger.error(f"Unexpected error {e}")
        return Response({"error" : "An unexpected error occured, please check the logs for more information"})

@api_view(['POST'])
def get_products(request):
    """

    Fetches a list of products filtered by store name which is supplied by the client, from
        the Supabase API using a custom RPC function

    Needs:
        store_name in form of json like:
        {
            store_name: my_store
        }
    """
    # Get store name to filter stores
    store_names = request.data.get('store_names')

    # Check if the store name was provided
    if not store_names:
        return Response({'error' : 'store_names are required'})
    
    api_url = f"{REQUEST_URL}/get_products_by_store_names"

    # send to rpc function at supabase
    payload = {"store_filters" : store_names }

    try:
        # Send POST to rpc
        response = requests.post(api_url, headers=headers, json=payload)

        # If succeed
        if response.status_code == 200:
            products_data = response.json()
            print(f"Products DATA: {products_data}")

            if not products_data:
                return Response({"error": "no products found for this store"})
            
            return Response(products_data)
        
        # Supabase error
        return Response({'error': f'error reaching supabase api: {response.status_code}'})
    
    except requests.exceptions.RequestException as e:
        return Response({'error' : str(e)})
