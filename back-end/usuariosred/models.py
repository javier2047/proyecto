
from django.db import models

#from django.contrib.auth.hashers import make_password, check_password
'''
from django.contrib.auth.models import AbstractBaseUser,  PermissionsMixin

from django.utils.translation import gettext as _
from .manages import managesusuario


class Usuarios(AbstractBaseUser,PermissionsMixin):

    rut = models.CharField(_("rut"),max_length=12,unique= True)
    nombre = models.CharField(_("nombre"),max_length=20)
    apellido = models.CharField(_("apellido"),max_length = 20)
    segundoapellido = models.CharField(_("segundoapellido"),max_length=20)
    email = models.EmailField(_("email"),max_length = 70)

    TIPO_USUARIO_CHOICES = [
        ('medico', 'Medico'),
        ('supervisor', 'Supervisor'),
        ('administrativo', 'Administrativo'),
    ]
    tipousuario = models.CharField(_("tipousuario"),max_length=50, choices=TIPO_USUARIO_CHOICES)
    especialidad = models.CharField(_("especialidad"),max_length= 50)
    jefeacargo = models.CharField (_("jefeacargo"),max_length=50)
    nombresupervisor = models.CharField (_("nombresupervisor"),max_length=20,default='no tiene')
    apellidosupervisor = models.CharField (_("apellidosupervisor"),max_length=20,default='no tiene')

    password = models.CharField(_("password"),max_length = 128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Permiso para acceder al panel de administración
    is_superuser = models.BooleanField(default=False)  # Permiso de superusuario
    date_joined = models.DateTimeField(auto_now_add=True)

    

    objects = managesusuario()
    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['nombre','apellido','segundoapellido','email','tipousuario']
    
    
    
    class Meta:
        verbose_name =_("user")
        verbose_name_plural =_("users")
    
    
    def __str__(self):
        return self.rut
    
    @property
    def get_full_name(self):
        return f"{self.nombre}{self.apellido}{self.segundoapellido}"



'''





'''
#establecer contraseña cifrada

    def set_password(self, raw_password):
        self.password = make_password(raw_password)  # Usar el método de Django para cifrar la contraseña
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)  # Verificar la contraseña de manera segura





'''

'''
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
'''


