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
    try:
        postgres_url = settings.SUPABASE_URL + '/rest/v1/stores'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {settings.SUPABASE_KEY_SR}',
            'apikey': f'{settings.SUPABASE_KEY_SR}',
        }
        
        print(f"=== SUPABASE_URL | {postgres_url} ===")
        print(f"=== SUPABASE_KEY | {settings.SUPABASE_KEY_SR} ===")

        postgres_response = requests.get(postgres_url, headers=headers)

        print('Stores:', postgres_response)

        if (postgres_response.status_code == 200):
            return Response(postgres_response.json())
        else:
            return Response({'error': f'PostgREST API request failed, ERROR CODE | {postgres_response.status_code}'})
    except requests.exceptions.RequestException as e:
        return Response({'error' : str(e)})

@api_view(['GET'])
def get_prices(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT PRICES FROM PRODUCTS")
        
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
