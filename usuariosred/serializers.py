from rest_framework import serializers
from .models import Usuarios

class usuarioRedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields  = '__all__'



class loginSerializer(serializers.Serializer):
    rut = serializers.CharField(max_length=12)
    contraseña = serializers.CharField(max_length=16, write_only=True)  