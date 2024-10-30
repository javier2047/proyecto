from django.db import models

# Create your models here.

class usuario(models.Model):
    rut = models.CharField(max_length=13)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length = 50)
    email = models.EmailField(max_length = 100)
    tipo  = models.CharField (max_length = 50)
    especialidad = models.CharField(max_length= 100)
    jefeacargo = models.CharField (max_length=100)
    
    contraseña = models.CharField(max_length = 100)
    
