from rest_framework import serializers
from .models import Usuarios
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated


class usuarioRedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields  = '__all__'



class loginSerializer(serializers.Serializer):
        rut = serializers.CharField(max_length=12)
        password = serializers.CharField(max_length=128, write_only=True) 


        def validate(self, data):
            user = authenticate(rut=data['rut'], password=data['password'])
            if user is None:
                raise serializers.ValidationError("Invalid credentials")
            token, created = Token.objects.get_or_create(user=user)
            return {
                'token': token.key,
                'tipousuario': user.tipousuario,  # Enviamos el tipo de usuario
            }
        
