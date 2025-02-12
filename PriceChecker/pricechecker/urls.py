"""
-------------------------------------------------------------------------------
Program:    urls.py
Author:     Jeffrey Saylor
Date:       02/12/2025
Language:   python
Purpose:    The purpose of this code is to have django point to our html pages
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JQS  02/12/2025     Added the homepage path
-------------------------------------------------------------------------------
"""

"""
URL configuration for pricechecker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('home/', views.home)
]
