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
import requests
import logging
from django.conf import settings
from rest_framework import status
import requests
import logging
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from requests.exceptions import RequestException, Timeout, RequestException

import serpapi

# Use the django logger instead of print
# This will return the name of the current logger, if none then create a new one
# Use the django logger instead of print
# This will return the name of the current logger, if none then create a new one
logger = logging.getLogger(__name__)

# Set GLOBAL variables for the Supabase API
# Set GLOBAL variables for the Supabase API
SUPABASE_URL = settings.SUPABASE_URL
SUPABASE_ANON_KEY = settings.SUPABASE_KEY

# GLOBALLY Define headers for the Supabase RPC API requests
# GLOBALLY Define headers for the Supabase RPC API requests
headers = {
    "apikey": SUPABASE_ANON_KEY,
    # "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json"
}

# Concatenate supabaseurl with supabase's rest api url
REQUEST_URL = SUPABASE_URL + '/rest/v1/rpc'
# Concatenate supabaseurl with supabase's rest api url
REQUEST_URL = SUPABASE_URL + '/rest/v1/rpc'

# Keep for testing purposes
# Keep for testing purposes
@api_view(['GET'])
def test_api(request):
    return Response({'message' : "Hello, World! This is a test API from the django API app."})

@api_view(['POST'])
def get_stores(request):
    """
    Fetches a list of stores from the Supabase API using a custom RPC function

    Requires:
        None

    Requires:
        None

    """
    try:
        # Send POST request to Supabase API
        response = requests.post(f"{REQUEST_URL}/get_stores", headers=headers, timeout=10)
        response.raise_for_status()  # Catch all for HTTP errors
        response.raise_for_status()  # Catch all for HTTP errors

        # Successful response
        if (response.status_code == 200):
            try:
                stores_data = response.json()
            except ValueError:
                # Handle the case where the response is not valid JSON
                logger.error("Response is not valid JSON")
                return Response(
                    {
                        "error" : "Response was an invalid JSON response"
                    }, 
                    status=500
                )
            try:
                stores_data = response.json()
            except ValueError:
                # Handle the case where the response is not valid JSON
                logger.error("Response is not valid JSON")
                return Response(
                    {
                        "error" : "Response was an invalid JSON response"
                    }, 
                    status=500
                )

            # Check for empty json inside response
            # Check for empty json inside response
            if not stores_data:
                return Response(
                    {
                        "warning" : "No stores found"
                    }, 
                    status=status.HTTP_204_NO_CONTENT
                )
                return Response(
                    {
                        "warning" : "No stores found"
                    }, 
                    status=status.HTTP_204_NO_CONTENT
                )
            
            # Valid data
            return Response(stores_data, status=status.HTTP_200_OK)
    
    # Timeout Error
            return Response(stores_data, status=status.HTTP_200_OK)
    
    # Timeout Error
    except Timeout:
        # after x amount of time
        logger.error("Request to supabase url timed out")
        return Response(
            {
                "error" : "Request to supabase timed out"
            },
            status=504
        )
    
    except requests.exceptions.HTTPError as e:
        logger.error(f"HTTP error: {e}")
        return Response(
            {
                "error": "An HTTP error occurred. Please try again later."
            },
            status=e.response.status_code
        )
    
    except RequestException as e:
        logger.error(f"Request exception: {e}")
        return Response(
            {
                "error": "A request error occurred. Please try again later."
            },
            status=status.HTTP_502_BAD_GATEWAY
        )
    
@api_view(['POST'])
def get_products(request):
    """

    Fetches a list of products filtered by store name which is supplied by the client, from
        the Supabase API using a custom RPC function

    Requires:
        store_name in the form of json like:
    Requires:
        store_name in the form of json like:
        {
            store_names: ["my_store", "my_other_store"]
        }
    """

    # grab the store_names from the request data
    store_names = request.data.get('store_names')

    # Check if the store_names is a string and convert it to a list
    # store_names = json.loads(store_names) if isinstance(store_names, str) else store_names

    # Check if the store name was provided
    if not store_names:
        return Response({'error' : 'store_names are required'})
    
    # Form the RPC api url to send the request to
    api_url = f"{REQUEST_URL}/get_products_by_store_names"

    # Define the payload to send to the api
    payload = {
        "stores_filters" : store_names
    }

    try:
        # fetch the request to the supabase API
        response = requests.post(api_url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()  # Catch all for HTTP errors
        
        if (response.status_code == 200):
            try:
                data = response.json()
            except ValueError as e:
                logger.error(f"Supabase JSON error: {e}")
                return Response(
                    {
                        "error" : "Supabase API returned an invalid JSON response"
                    }, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            if not data:
                return Response(
                    {
                        "warning" : f"No products found for the given store names {store_names}"
                    }, 
                    status=status.HTTP_204_NO_CONTENT
                )
            
            # Valid data
            return Response(data, status=status.HTTP_200_OK)
    
    # Timeout Error
    except Timeout:
        logger.error("Request to supabase url timed out")
        return Response(
            {
                "error" : "Request to supabase timed out"
            }, status=status.HTTP_504_GATEWAY_TIMEOUT
        )
    
    except requests.exceptions.HTTPError as e:
            logger.error(f"HTTP error: {e}")
            return Response(
                {
                    "error": "An HTTP error occurred. Please try again later."
                },
                status=e.response.status_code
            )
        
    except RequestException as e:
        logger.error(f"Request exception: {e}")
        return Response(
            {
                "error": "A request error occurred. Please try again later."
            },
            status=status.HTTP_502_BAD_GATEWAY
        )

@api_view(['POST'])
def insert_product_data(request):
    """ Inserts product data into the Supabase API using a custom RPC function """
    # create the api url to send the request to
    api_url = f"{REQUEST_URL}/insert_product_with_price"

    # json_body = request.data.get('json_body')

    # Replace this with the actual data you want to insert
    # Code is above is commented out to prevent errors when testing
    json_body = {
        "in_product_name": "Example Product",
        "in_brand": "Example Brand",
        "in_model": "Model X",
        "in_specs": { "color": "black", "size": "M" },
        "in_image_url": "https://example.com/image.jpg",
        "in_store_id": "1915ab14-30fa-4962-ae80-1b8c97caec92",
        "in_price": 99.99,
        "in_user_id": "017153fe-dbe4-4196-9dc8-40ed534d90b9",
        "in_session_id": "00000000-0000-0000-0000-000000000000"
    }

    response = requests.post(api_url, headers=headers, json=json_body, timeout=10)

    return Response(data=response.json(), status=response.status_code)

@api_view(['POST'])
def get_graph_data(request):
    """ Retrieves graph data from the Supabase API using a custom RPC function """

    # create the api url to send the request to
    api_url = f"{REQUEST_URL}/get_product_prices_with_stores"

    try:
        response = requests.post(api_url, headers=headers, timeout=10)
        response.raise_for_status()  # Catch all for HTTP errors

        if (response.status_code == 200):
            try:
                data = response.json()
            except ValueError as e:
                logger.error(f"Supabase JSON error: {e}")
                return Response(
                    {
                        "error" : "Supabase API returned an invalid JSON response"
                    }, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Empty data check
            if not data:
                return Response(
                    {
                        "warning" : "No graph data found"
                    }, 
                    status=status.HTTP_204_NO_CONTENT
                )
            
            # Valid data
            return Response(data, status=status.HTTP_200_OK)
        
    # Timeout Error
    except Timeout:
        logger.error("Request to supabase url timed out")
        return Response(
            {
                "error" : "Request to supabase timed out"
            }, status=status.HTTP_504_GATEWAY_TIMEOUT
        )
    
    except requests.exceptions.HTTPError as e:
            logger.error(f"HTTP error: {e}")
            return Response(
                {
                    "error": f"An HTTP error occurred. Please try again later. {e}"
                },
                status=e.response.status_code
            )
        
    except RequestException as e:
        logger.error(f"Request exception: {e}")
        return Response(
            {
                "error": "A request error occurred. Please try again later."
            },
            status=status.HTTP_502_BAD_GATEWAY
        )

# @api_view(['POST'])
# def get_ebay_data(request):
#     """ fetch ebay API data """
#     ebay = Ebay()
#     response = ebay.getprice()

#     if (not response):
#         print("empty response")
#         return Response(response)
#     else:
#         return Response(response)

@api_view(['GET'])
def get_serp_data(request):

    # Macbook M3 Example
    shopping_results = {
        "position": 1,
        "title": "Apple MacBook Air 13-inch Laptop M3 chip",
        "product_link": "https://www.google.com/shopping/product/1893637109356385173?gl=us",
        "product_id": "1893637109356385173",
        "serpapi_product_api": "https://serpapi.com/search.json?engine=google_product&gl=us&google_domain=google.com&hl=en&product_id=1893637109356385173",
        "immersive_product_page_token": "eyJlaSI6IkszY1RhTkNLRUx6X3B0UVBpOVdYb0FNIiwicHJvZHVjdGlkIjoiIiwiY2F0YWxvZ2lkIjoiMTg5MzYzNzEwOTM1NjM4NTE3MyIsImhlYWRsaW5lT2ZmZXJEb2NpZCI6IjE2MDkyNDI2ODQyNTM0MDQzODUzIiwiaW1hZ2VEb2NpZCI6Ijg4OTIyNDY4MjE4MTYzNjc5NiIsInJkcyI6IlBDXzMzNzY0NzEzOTAxMzIxOTI0NTZ8UFJPRF9QQ18zMzc2NDcxMzkwMTMyMTkyNDU2IiwicXVlcnkiOiJNYWNib29rK00zIiwiZ3BjaWQiOiIzMzc2NDcxMzkwMTMyMTkyNDU2IiwibWlkIjoiNTc2NDYyNzkwOTgyODI1NDkyIiwicHZ0IjoiaGciLCJ1dWxlIjpudWxsfQ==",
        "serpapi_immersive_product_api": "https://serpapi.com/search.json?engine=google_immersive_product&page_token=eyJlaSI6IkszY1RhTkNLRUx6X3B0UVBpOVdYb0FNIiwicHJvZHVjdGlkIjoiIiwiY2F0YWxvZ2lkIjoiMTg5MzYzNzEwOTM1NjM4NTE3MyIsImhlYWRsaW5lT2ZmZXJEb2NpZCI6IjE2MDkyNDI2ODQyNTM0MDQzODUzIiwiaW1hZ2VEb2NpZCI6Ijg4OTIyNDY4MjE4MTYzNjc5NiIsInJkcyI6IlBDXzMzNzY0NzEzOTAxMzIxOTI0NTZ8UFJPRF9QQ18zMzc2NDcxMzkwMTMyMTkyNDU2IiwicXVlcnkiOiJNYWNib29rK00zIiwiZ3BjaWQiOiIzMzc2NDcxMzkwMTMyMTkyNDU2IiwibWlkIjoiNTc2NDYyNzkwOTgyODI1NDkyIiwicHZ0IjoiaGciLCJ1dWxlIjpudWxsfQ%3D%3D",
        "source": "Micro Center",
        "source_icon": "https://serpapi.com/searches/6813772aa57b439a15c7c439/images/76efabd3c57ab8e6af3c3b0ca17d9462c85e17ad63f0ee78f2debda3dc8e56ee.png",
        "multiple_sources": True,
        "price": "$799.99",
        "extracted_price": 799.99,
        "rating": 4.8,
        "reviews": 7200,
        "snippet": "Performs well (728 user reviews)",
        "extensions":
        [
            "Nearby, 5 mi"
        ]
        ,
        "thumbnail": "https://serpapi.com/searches/6813772aa57b439a15c7c439/images/76efabd3c57ab8e6af3c3b0ca17d94620124e30d0c13b1e8dc19df8809356cac.webp",
        "thumbnails":
        [
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ1DPRBZGwj6N8whUhCWDFr8u0TDxcZiuc8SpLA2zGFhehI8rBm10s6EH5m2YLx42mMa-i_9aU8q0ODznpJ-wUE3IN7IS4v"
        ]
        ,
        "serpapi_thumbnails":
        [
            "https://serpapi.com/images/url/BoeMJHicDcnbCoIwAADQL_Ka2RQitKkZZheTyJewKW7B5nQzrQ_p3_qbOq_n-8FScuFqWs1Q_-KyrhR5Z7raCFlKglTUUk3glnPCmlW3_J_rpZUToaMBDye_iMaHnYIR53h9gWEPBv0MJ1SQAYGMJ575jkJc4xj0PjV0YQebOTWvyWSZdFcq5OaUOej0PXwzvlXGPJjF6SLOrOcPZz00KQ"
        ]
    }

    return Response(
        {
            "store": shopping_results.get("source"),
            "name": shopping_results.get("title"),
            "price": shopping_results.get("price"),
            "image": shopping_results.get("thumbnails")
        }
    )

@api_view(['POST'])
def get_google_products(request):
    query_name = request.data.get('query')

    print(query_name)

    if not query_name: return Response("Query name is empty")
    params = {
        "api_key": "bdf065e3f4dbf68c669a348446b3aacdec6a405146b47aee44a0f11c363141cc",
        "engine": "google_shopping",
        "google_domain": "google.com",
        "q": "Coffee"
    }

    client = serpapi.Client(api_key="bdf065e3f4dbf68c669a348446b3aacdec6a405146b47aee44a0f11c363141cc")
    shopping_results = client.search({
        'engine': 'google_shopping',
        'q': query_name,
        "num": 10
    })

    filtered_results = []

    if "shopping_results" in shopping_results:
        for item in shopping_results["shopping_results"][:10]:
            filtered_results.append({
                "title": item.get('title'),
                "price": item.get('price'),
                "source": item.get('source'),
                "link": item.get('link')
            })
    else:
        print("No shopping results found.")

    return Response(filtered_results)