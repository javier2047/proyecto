from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin 
from django.utils.translation import gettext as _
from .forms import CustomisarChageFormulario,CustomisarCreacionFormulario 
from .models import Usuarios

# Register your models here.
from .models import Usuarios

class UsuariosAdmin(BaseUserAdmin):
    ordering = ['rut']
    add_form = CustomisarCreacionFormulario
    form = CustomisarChageFormulario
    model = Usuarios
    list_display = ['rut','nombre','apellido','segundoapellido','email','tipousuario','especialidad','jefeacargo','nombresupervisor','apellidosupervisor','is_active','is_staff']
    list_display_links = ['rut']
    list_filter = ['rut','nombre','apellido','segundoapellido','email','tipousuario','especialidad','jefeacargo','nombresupervisor','apellidosupervisor','is_active','is_staff']
    search_fields = ['rut','nombre','apellido','segundoapellido','email','tipousuario']

    fieldsets = (
        (
            _("Login Credentials"), {
                "fields": ("rut", "password",)
            }, 
        ),
        (
            _("Personal Information"),
            {
                "fields": ('nombre', 'apellido','segundoapellido','email','tipousuario')
            },
        ),
        (
            _("Permissions and Groups"),
            {
                "fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")
            },
        ),
        (
            _("Important Dates"),
            {
                "fields": ("last_login",)
            },
        ),
    )
    add_fieldsets = (
            (None, {
                "classes": ("wide",),
                "fields": ("rut", "nombre", "apellido", "password1", "password2", "is_staff", "is_active"),
            },),
        )

admin.site.register(Usuarios, UsuariosAdmin)