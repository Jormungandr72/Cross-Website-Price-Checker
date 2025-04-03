# Create your views here.
from .models import Product

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import connection
from django.conf import settings
from .serializers import ProductSerializer

import requests

# api view decorator to inherit Response + Request classes
@api_view(['GET'])
def test_api(request):
    return Response({'message' : "Hello, World! This is a test API from the django API app."})

@api_view(['GET'])
def get_stores(request):
    query_result = None
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM test_schema.stores")
        query_result = cursor.fetchall()
    
    return_data = [{"name": row[0]} for row in query_result]
    return Response({'stores' : return_data})

@api_view(['GET'])
def get_products(request, store):
    query_result = None
    cursor = connection.cursor()
    query_result = cursor.execute("SELECT * FROM test_schema.products WHERE store_id = %s", [store])
    
    query_result = cursor
    print(f"QUERY RESULT: | {query_result}")
    
    cursor.close()
    
    return Response({'message' : cursor}, status=201)

@api_view(['GET'])
def get_price(request, product_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT PRICES FROM PRODUCTS WHERE ID = %s", [product_id])

    return Response({'message' : cursor}, status=201)

@api_view(['POST'])
def create_price(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def update_price(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'product not found!'})    
    
    serializer = ProductSerializer(instance=product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors)
