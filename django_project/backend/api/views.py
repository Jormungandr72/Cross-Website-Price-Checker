# from django.shortcuts import render

# Create your views here.

from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def test_api(request):
    return Response({'message' : "Hello From Django!!! merry Christmas"})
