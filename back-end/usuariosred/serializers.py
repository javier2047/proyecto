from rest_framework import serializers
from .models import Usuarios

class usuarioRedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        field = '__all__'
