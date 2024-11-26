from django.db import models

# Create your models here.

class tasks (models.Model):
    Nombre = models.CharField(max_length=200)
    Rangodefecha = models.TextField(blank=True)

    done = models.BooleanField(default=False)

    def __str__(self) :
        return self.Nombre
