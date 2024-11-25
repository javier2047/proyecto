from rest_framework import serializers


from .models import Formularios

class Formularioserializer(serializers.ModelSerializer):
    class Meta:
        model = Formularios
       # fields toma todos los valores que esten en Formularios
        fields = '__all__'

