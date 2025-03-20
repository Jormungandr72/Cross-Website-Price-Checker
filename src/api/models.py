from django.db import models

# Create your models here.
class Product(models.Model):
    """ model storing all product related information """
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
