# Create your views here.

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import connection
from .serializer import ProductSerializer

import requests

# api view decorator to inherit Response + Request classes
@api_view(['GET'])
def test_api(request):
    return Response({'message' : "Hello, World! This is a test API from the django API app."})

# Example API request for stores API
@api_view(['GET'])
def get_price(request, product_id):
    api_url = f"https://fakestoreapi.com/products/{product_id}"
    response = requests.get(api_url)

    if (response.code == 200):
        return Response(response.json())
    else:
        return Response({'error': 'failed to fetch data...'}, status=400)

@api_view(['GET'])
def get_products(request):
    name = request.data.get("name")
    price = request.data.get("price")

    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM products WHERE name = %s AND price = %s", [name, price])

    return Response({'message' : "Products fetched successfully."}, status=201)