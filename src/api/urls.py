from django.urls import path
# from .views import test_api, get_price, get_products
from .views import test_api
from .views import update_price
from .views import get_stores

urlpatterns = [
    path('test/', test_api), # example of a simple API endpoint
    path('prices/<int:product_id>/', update_price),
    path('test/get-stores/', get_stores)
    # path('get_price/<int:product_id>/', get_price), # example of passing a parameter in the URL, GET request
    # path('get_products/', get_products), # example of a POST request
]
