from django.db import models

# Create your models here.




class Formularios(models.Model):
    
    #categoria en el estado en que se encuentra el formulario
    
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado')
    ]
    
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='pendiente'
    )



    
    nombre = models.CharField(max_length=20)
    apellido = models.CharField(max_length=20)
    fecha_inicio = models.DateField()
    hora_inicio = models.TimeField(null=True, blank=True)  # Opcional para definir solo la fecha
    fecha_fin = models.DateField()
    hora_fin = models.TimeField(null=True, blank=True)
    especialidad = models.CharField(max_length=50)
    unidad = models.CharField (max_length= 50)
    motivo = models.CharField(max_length=20)
    estado = models.CharField(max_length=20, default='pendiente')

    def __str__(self):
        return f"Suspensión de {self.nombre} {self.apellido} desde {self.fecha_inicio} {self.hora_inicio or ''} hasta {self.fecha_fin} {self.hora_fin or ''} {self.estado}"