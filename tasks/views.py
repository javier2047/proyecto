from rest_framework import viewsets
from .serializers import taskserializer
from .models import tasks

# Create your views here.
class tasksvista (viewsets.ModelViewSet):
    serializer_class = taskserializer

    queryset = tasks.objects.all()