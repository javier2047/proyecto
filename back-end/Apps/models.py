from django.db import models
# Create your models here.

class usuario(models.Model):
    
    rut = models.CharField(max_length=10)

    #verificador de un digito que solo permite un valor entre 0 y 9 contando la letra k
    nombre = models.CharField(max_length=20)
    apellido = models.CharField(max_length = 20)
    segundoapellido = models.CharField(max_length=20)
    email = models.EmailField(max_length = 100)
    tipousuario  = models.CharField (max_length = 50)
    especialidad = models.CharField(max_length= 100)
    jefeacargo = models.CharField (max_length=100)
    nommbresupervisor = models.CharField (max_length=20,default='no tiene')
    apellidosupervisor = models.CharField (max_length=20,default='no tiene')

    contraseña = models.CharField(max_length = 16)
    
    