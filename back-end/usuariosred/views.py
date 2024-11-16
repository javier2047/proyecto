from rest_framework import generics
from django.shortcuts import render
from .models import Usuarios
from .serializers import usuarioRedSerializer
#from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.decorators import api_view




class usuarioRedcrearViews(generics.CreateAPIView):

    queryset = Usuarios.objects.all()
    serializer_class = usuarioRedSerializer

@APIView([POST])
def login(request):
    rut = request.data.get('rut')
    contraseña: request.data.get('contraseña')
    user = Authenticarte(rut=rut, contraseña= contraseña)

    if user:
        # Suponiendo que usas `authtoken` para manejar sesiones

        #importa el token
        from rest_framework.authtoken.models import Token
        token, _ = Token.objects.get_or_create(user= rut)
        return JsonResponse({
            'token': token.key,
            'role': user.tipousuario  # Envía el tipo de usuario
        })
    else:
        return JsonResponse({'error': 'Credenciales inválidas'}, status=401)