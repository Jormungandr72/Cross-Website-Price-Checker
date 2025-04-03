"""
-------------------------------------------------------------------------------
Program:    urls.py
Author:     Justin Clark
Date:       2025-04-03
Language:   python 3.12.9
Purpose:    Django URL configuration for backend project.
            Maps URLs to views and includes API endpoints.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC 2025-04-03     added URL patterns for API and frontend
-------------------------------------------------------------------------------
"""


from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),                        # React frontend
    path('api/', include('api.urls')),      # API endpoints
]
