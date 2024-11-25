from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
#from rest_framework import serializers

user  = get_user_model ()

class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = user
        fields= ['id','rut','nombre','apellido','segundoapellido','email','tipousuario','password','especialidad','jefeacargo','apellidosupervisor','nombresupervisor']