from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import Usuarios


#metodo  para crear usuarios
class CustomisarCreacionFormulario(UserCreationForm):
    class Meta(UserCreationForm):
        model = Usuarios
        fields = ['rut','nombre','apellido','segundoapellido','email','tipousuario','especialidad','jefeacargo','nombresupervisor','apellidosupervisor','rutsupervisor', 'emailjefe']
        error_class = "error"
        
class CustomisarChageFormulario(UserChangeForm):
    class Meta(UserChangeForm):
        model = Usuarios
        fields = ['rut','nombre','apellido','segundoapellido','email','tipousuario','especialidad','jefeacargo','nombresupervisor','apellidosupervisor','rutsupervisor','emailjefe']
        error_class = "error"
        