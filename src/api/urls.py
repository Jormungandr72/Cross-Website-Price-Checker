from django.urls import path
from .views import test_api, get_price, get_products

urlpatterns = [
    path('test/', test_api), # example of a simple API endpoint
    path('get_price/<int:product_id>/', get_price), # example of passing a parameter in the URL, GET request
    path('get_products/', get_products), # example of a POST request
]