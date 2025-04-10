"""
-------------------------------------------------------------------------------
Program:    views.py
Author:     Justin Clark
Date:       2025-04-03
Language:   python 3.12.9
Purpose:    Django views for backend project.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC 2025-04-03     added index view for React frontend
-------------------------------------------------------------------------------
"""


from django.shortcuts import render

def index(request):
    return render(request, 'index.html')
