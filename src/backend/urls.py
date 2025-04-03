from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),                        # React frontend
    path('api/', include('api.urls')),      # API endpoints
]
