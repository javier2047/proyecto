from django.shortcuts import render
from .serializers import Formularioserializer
from .models import Formularios
from rest_framework import viewsets
from rest_framework.generics import UpdateAPIView 
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class vistaformularios (viewsets.ModelViewSet):
    serializer_class = Formularioserializer

    queryset = Formularios.objects.all()
    
    #metodo para modifica el estado
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()

        #obtiene el valor de estado si es que existe
        estado = request.data.get('estado')  
        if estado is not None:
            instance.estado = estado
            instance.save()
            return Response({'message': 'Estado actualizado correctamente'}, status=status.HTTP_200_OK)
        return Response({'error': 'El campo estado no fue proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
