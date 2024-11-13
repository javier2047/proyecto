from rest_framework import  serializers
from .models import usuario

class usuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuario

        field = '__all__'
        
        #metodo de prueba para ver si la funcion estaba bien
    # field = ['rut']