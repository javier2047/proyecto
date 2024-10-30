from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate

# Create your views here.

class LoginView(APIView):
    def post(self, request):
        rut = request.data.get("rut")
        contraseña = request.data.get("contraseña")
        user = authenticate(rut=rut, contraseña=contraseña)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)