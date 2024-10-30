from django.shortcuts import render
from .serializers import Formularioserializer
from .models import Formularios
from rest_framework import viewsets

# Create your views here.
class vistaformularios (viewsets.ModelViewSet):
    serializer_class = Formularioserializer

    queryset = Formularios.objects.all()