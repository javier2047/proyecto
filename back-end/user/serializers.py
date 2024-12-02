from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
#from rest_framework import serializers

#serializer de la creacion de usuario para verificar valor

user  = get_user_model ()

class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = user
        fields= ['id','rut','nombre','apellido','segundoapellido','email','tipousuario','password','especialidad','apellidosupervisor','nombresupervisor','rutsupervisor','emailjefe']