from rest_framework import generics
from django.shortcuts import render
from .models import Usuarios
from .serializers import usuarioRedSerializer

from .serializers import loginSerializer

from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class usuarioRedcrearViews(generics.CreateAPIView):
    serializer_class = usuarioRedSerializer
    queryset = Usuarios.objects.all()
    permission_classes = [AllowAny] 


class LoginView(APIView):
    permission_classes = [AllowAny]  #permitir acceso sin autentificacion

    def post(self, request):
        serializer = loginSerializer(data=request.data)
        if serializer.is_valid():
            rut = serializer.validated_data['rut']
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