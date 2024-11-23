from typing import Any
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http import HttpRequest
from .models import Usuarios



class autentificationRut(BaseBackend):
    def authenticate(self, request,username=None, password=None, **kwargs):
        try:
            user = Usuarios.objects.get(rut=username)

            #chequea la contraseña
            if user.check_password(password):
                return user
        except Usuarios.DoesNotExist:
            return None
        
    def get_user(self,user_id):
        try:
            return Usuarios.objects.get(pk=user_id)
        except Usuarios.DoesNotExist:
            return None
        
