from django.db import models
from django.contrib.auth.models import AbstractBaseUser,  PermissionsMixin

from django.utils.translation import gettext as _
from .manages import managesusuario
#modelo pricipal para la tabla usuarios
# Create your models here.
class Usuarios(AbstractBaseUser, PermissionsMixin):
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
    nombresupervisor = models.CharField(max_length=20,default='no tiene')
    apellidosupervisor = models.CharField(max_length=20,default='no tiene')
    rutsupervisor = models.CharField(max_length=12, default='no tiene')
    emailjefe = models.EmailField(max_length=35, default='')

    password = models.CharField(max_length = 128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Permiso para acceder al panel de administración
    is_superuser = models.BooleanField(default=False)  # Permiso de superusuario
    date_joined = models.DateTimeField(auto_now_add=True)

    #carateres necesarios para creacion de usuario rut como principal y datos requeridos son los demas
    objects = managesusuario()
    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['nombre','apellido','segundoapellido','email','tipousuario', 'especialidad','nombresupervisor','apellidosupervisor','rutsupervisor', 'emailjefe']
    
    
    
    class Meta:
        verbose_name =_("user")
        verbose_name_plural =_("users")
    
    
    def __str__(self):
        return self.rut
    
    @property
    def get_full_name(self):
        return f"{self.nombre}{self.apellido}{self.segundoapellido}"
