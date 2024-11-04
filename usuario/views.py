from rest_framework import generics
from django.shortcuts import render
from .models import UsuarioRed
from .serializers import usuarioRedSerializer

class usuarioRedcrearViews(generics.CreateAPIView):

    queryset = UsuarioRed.objects.all()
    serializer_class = usuarioRedSerializer