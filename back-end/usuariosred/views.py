from rest_framework import generics
from django.shortcuts import render
from .models import Usuarios
from .serializers import usuarioRedSerializer
from .serializers import loginSerializer
#from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework import viewsets

from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
<<<<<<< HEAD

from rest_framework.authtoken.models import Token

=======
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
>>>>>>> 31123c6862c781f8326a0e571a5def5c167f4efa

#api generica que solo admnte el post
class usuarioRedcrearViews(generics.CreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = usuarioRedSerializer

<<<<<<< HEAD
#api que permite el get y el post 
=======
>>>>>>> 31123c6862c781f8326a0e571a5def5c167f4efa
class vistaRegistro (viewsets.ModelViewSet):
    serializer_class = usuarioRedSerializer
    queryset = Usuarios.objects.all()


<<<<<<< HEAD

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import loginSerializer 
from django.contrib.auth import authenticate

# API para el inicio de sesión
class LoginView(APIView):
    permission_classes = [AllowAny]

=======
class LoginView(APIView):
    permission_classes = [AllowAny]  #permitir acceso sin autentificacion
>>>>>>> 31123c6862c781f8326a0e571a5def5c167f4efa

    def post(self, request):
        serializer = loginSerializer(data=request.data)
        if serializer.is_valid():
            rut = serializer.validated_data['rut']
<<<<<<< HEAD
            password = serializer.validated_data['password']

            # Autenticación mediante el backend personalizado
            user = authenticate(username=rut, password=password)

            if user:
                # Generar un token si no existe
                token, created = Token.objects.get_or_create(user=user)

                return Response({
                    "message": "Inicio de sesión exitoso",
                    "token": token.key,
                    "tipousuario": user.tipousuario,  # Agregar el tipo de usuario aquí
                    "user": {
                        "rut": user.rut,
                        "nombre": user.nombre,
                        "apellido": user.apellido,
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Credenciales incorrectas"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
=======
            contraseña = serializer.validated_data['contraseña']
            
            try:
                usuario = Usuarios.objects.get(rut=rut)
                # Verifica la contraseña
                if check_password(contraseña, usuario.contraseña):
                    # Genera o recupera el token
                    token, created = Token.objects.get_or_create(user=usuario)
                    return Response({'token': token.key}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)
            except Usuarios.DoesNotExist:
                return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class login (APIView):
    def login(request):
        rut = request.data.get('rut')
        contraseña = request.data.get('contraseña')

        Usuarios = authenticate(rut=rut, contraseña=contraseña)

        if Usuarios:
            # Suponiendo que usas authtoken para manejar sesiones
            from restframework.authtoken.models import Token
            token,  = Token.objects.get_or_create(user=user)
            return JsonResponse({
                'token': token.key,
                'role': Usuarios.tipousuario  # Envía el tipo de usuario
            })
        else:
            return JsonResponse({'error': 'Credenciales inválidas'}, status=401)
>>>>>>> 31123c6862c781f8326a0e571a5def5c167f4efa
