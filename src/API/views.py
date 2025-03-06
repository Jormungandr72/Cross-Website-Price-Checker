# Create your views here.

from rest_framework.response import Response
from rest_framework.decorators import api_view

# import requests <-- for the example request

# api view decorator to inherit Response+Request classes
@api_view(['GET'])
def test_api(request):
    return Response({'message' : "Hello From Django!!! merry Christmas"})

# Example api request for api scraper
# @api_view(['GET'])
# def get_price(request, product_id):
#     api_url = f"https://example.com"
#     response = requests.get(api_url)

#     if (response.code == 200):
#         return Response(response.json())
#     else:
#         return Response({'error': 'failed to fetch data...'}, status=400)
