from django.contrib import admin

# Register your models here.
from .models import Usuarios

class UsuariosAdmin(admin.ModelAdmin):
    list_display = ['rut', 'nombre', 'apellido', 'email', 'tipousuario']
    search_fields = ['rut', 'nombre', 'apellido', 'email','tipousuario']

admin.site.register(Usuarios, UsuariosAdmin)