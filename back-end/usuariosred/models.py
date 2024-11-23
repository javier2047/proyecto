
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from django.contrib.auth.hashers import make_password, check_password

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UsuarioManage(BaseUserManager):
    def create_user(self, rut, password=None, **extra_fields):
        if not rut:
            raise ValueError('Los usuarios deben tener un rut')
        user = self.model(rut=rut, **extra_fields)
        if password:
        #incriptar contrseña
            user.set_password(password) #metodo para cifrar
        user.save(using=self._db)
        return user


    def create_superuser(self, rut, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(rut, password, **extra_fields)

class Usuarios(AbstractBaseUser,PermissionsMixin):

    
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

    password = models.CharField(max_length = 128)
    if_activate = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Permiso para acceder al panel de administración
    is_superuser = models.BooleanField(default=False)  # Permiso de superusuario


    objects = UsuarioManage()
    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['nombre','apellido','segundoapellido','email','tipousuario']
    
    def __str__(self):
        return f"{self.nombre}{self.apellido}" 

#establecer contraseña cifrada

    def set_password(self, raw_password):
        self.password = make_password(raw_password)  # Usar el método de Django para cifrar la contraseña
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)  # Verificar la contraseña de manera segura



