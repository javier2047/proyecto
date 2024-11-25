from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.


class Usuarios(models.Model):
    
    rut = models.CharField(max_length=12,unique= True)

    nombre = models.CharField(max_length=20)
    apellido = models.CharField(max_length = 20)
    segundoapellido = models.CharField(max_length=20)
    email = models.EmailField(max_length = 70)

    TIPO_USUARIO_CHOICES = [
        ('medico', 'Medico'),
        ('supervisor', 'Supervisor'),
        ('administrativo', 'Administrativo'),
    ]
    tipousuario = models.CharField(max_length=50, choices=TIPO_USUARIO_CHOICES)


    especialidad = models.CharField(max_length= 50)
    jefeacargo = models.CharField (max_length=50)
    nommbresupervisor = models.CharField (max_length=20,default='no tiene')
    apellidosupervisor = models.CharField (max_length=20,default='no tiene')

    contraseña = models.CharField(max_length = 16)

    def __str__(self):
        return f"{self.nombre}{self.apellido}" 
    