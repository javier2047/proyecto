from  django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

#usuario normal
class managesusuario(BaseUserManager):

    def create_user(self, rut, nombre,apellido, segundoapellido,email,tipousuario,password,especialidad,nombresupervisor,apellidosupervisor, rutsupervisor,**extra_fiels):
        if not rut:
            raise ValueError(_('Rut invalido'))
        
        if not nombre:
            raise ValueError(_('Nombre invalido'))
        
        if not apellido:
            raise ValueError(_('Apellido invalido'))
        
        if not segundoapellido:
            raise ValueError(_('Segundo apellido invalido'))
        
        if not tipousuario:
            raise ValueError(_('Tipo de usuario invalido'))
        
        if not email:
            raise ValueError (_('debe de tener correo'))
        
        if not especialidad:
            raise ValueError(_('Especialidad invalida'))
        
        if not nombresupervisor:
            raise ValueError(_('Nombre del supervisor invalido'))
        
        if not apellidosupervisor:
            raise ValueError(_('Apellido del supervisor invalido'))
        
        if not rutsupervisor:
            raise ValueError(_('Rut del supervisor invalido'))
        
        user = self.model(
            rut=rut,
            nombre=nombre,
            apellido=apellido,
            segundoapellido=segundoapellido,
            email=email,
            tipousuario=tipousuario,
            nombresupervisor = nombresupervisor,
            apellidosupervisor = apellidosupervisor,
            especialidad = especialidad,
            rutsupervisor = rutsupervisor,
            **extra_fiels
        )

        user.set_password(password)
        extra_fiels.setdefault('is_staff', True)
        extra_fiels.setdefault('is_superuser', True)
        
        user.save()
        return user
    

    #super usuario
    def create_superuser(self, rut, nombre,apellido, segundoapellido,email,tipousuario,password,especialidad,nombresupervisor,apellidosupervisor,rutsupervisor,**extra_fiels):
        extra_fiels.setdefault('is_staff', True)
        extra_fiels.setdefault('is_superuser', True)
        extra_fiels.setdefault('is_active', True)
        #return self.create_user(rut, password, **extra_fields)

        if extra_fiels.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        if extra_fiels.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        
        if not password:
            raise ValueError(_('No puede estar vacio el campo contraseña'))

        
        if not email:
            raise ValueError (_('debe de tener correo'))
        
        if not especialidad:
            raise ValueError(_('Especialidad invalida'))
        
        if not nombresupervisor:
            raise ValueError(_('Nombre del supervisor invalido'))
        
        if not apellidosupervisor:
            raise ValueError(_('Apellido del supervisor invalido'))

        if not rutsupervisor:
            raise ValueError(_('Rut del supervisor invalido'))

        user = self.create_user(rut, nombre,apellido, segundoapellido,email,tipousuario,password,especialidad,nombresupervisor,apellidosupervisor,rutsupervisor,**extra_fiels)

        user.save()
        return user