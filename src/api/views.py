# Create your views here.
from .models import Product

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import connection
from .serializers import ProductSerializer

# api view decorator to inherit Response + Request classes
@api_view(['GET'])
def test_api(request):
    return Response({'message' : "Hello, World! This is a test API from the django API app."})

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
