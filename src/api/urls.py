"""
-------------------------------------------------------------------------------
Program:    urls.py
Author:     Justin Clark
Date:       04/03/2025
Language:   python 3.12.9
Purpose:    This file is part of the Django project and is used to route requests
            to the appropriate view functions.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC  03.07.2025     created this file to handle API routing for the project
JC  04.03.2025     added get_stores and get_products endpoints
-------------------------------------------------------------------------------
"""

from django.urls import path
from .views import test_api
from .views import get_stores
from .views import get_products
from .views import get_graph_data
from .views import refresh_supabase_cache
from .views import insert_product_data

urlpatterns = [
    path('test-api/', test_api), # example of a simple API endpoint
    path('test/get-stores/', get_stores),
    path('test/get-products/', get_products),
    path('test/graph-data/', get_graph_data),
    path('test/insert-product-data/', insert_product_data),
    path('test/refresh-data/', refresh_supabase_cache),
]
