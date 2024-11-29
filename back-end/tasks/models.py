from django.db import models

# Create your models here.

class tasks (models.Model):
    Nombre = models.CharField(max_length=200)
    Rangodefecha = models.TextField(blank=True)
    FechaDesde = models.DateField(null=True, blank=True)  # Campo para la fecha de inicio
    FechaHasta = models.DateField(null=True, blank=True)  # Campo para la fecha de fin
    done = models.BooleanField(default=False)

    def __str__(self) :
        return self.Nombre
