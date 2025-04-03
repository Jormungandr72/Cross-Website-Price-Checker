from django.urls import path
# from .views import test_api, get_price, get_products
from .views import test_api
from .views import update_price
from .views import get_stores
from .views import get_products

urlpatterns = [
    path('test-api/', test_api), # example of a simple API endpoint
    path('prices/<int:product_id>/', update_price),
    path('test/get-stores/', get_stores), # example of a GET request
    path('test/get-products', get_products),
]
