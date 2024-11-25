
'''
from rest_framework import generics
from django.shortcuts import render
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

from rest_framework.authtoken.models import Token


#api generica que solo admnte el post
class usuarioRedcrearViews(generics.CreateAPIView):
    queryset = Usuarios2.objects.all()
    serializer_class = usuarioRedSerializer

#api que permite el get y el post 
class vistaRegistro (viewsets.ModelViewSet):
    serializer_class = usuarioRedSerializer
    queryset = Usuarios2.objects.all()



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


    def post(self, request):
        serializer = loginSerializer(data=request.data)
        if serializer.is_valid():
            rut = serializer.validated_data['rut']
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



<<<<<<< HEAD
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
=======

'''

>>>>>>> 943ef153e47f4df955220061b6dd1a677d545cdd
