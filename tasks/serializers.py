from rest_framework import serializers

from .models import tasks

class taskserializer(serializers.ModelSerializer):
    class Meta:
       model = tasks
       # fields = ('id' ,'titulo', 'descripcion','done')
       fields = '__all__'