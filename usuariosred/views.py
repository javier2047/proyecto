from rest_framework import generics
from django.shortcuts import render
from .models import Usuarios
from .serializers import usuarioRedSerializer


from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class usuarioRedcrearViews(generics.CreateAPIView):

    queryset = Usuarios.objects.all()
    serializer_class = usuarioRedSerializer
