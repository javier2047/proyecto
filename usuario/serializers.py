from rest_framework import serializers
from .models import UsuarioRed

class usuarioRedSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioRed
        field = '__all__'