from django.views.generic import TemplateView
from django.http import HttpResponse

class ReactAppView(TemplateView):
    template_name = "index.html"

def home(request):
    return HttpResponse("Welcome to the Homepage")
