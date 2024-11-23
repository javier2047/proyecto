from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from .views import usuarioRedcrearViews
from .views import LoginView
from rest_framework import routers
from usuariosred import views


routers =routers.DefaultRouter()
routers.register(r'usuariosred',views.vistaRegistro,'Usuariosred')


urlpatterns = [
    path('api/registrar', include(routers.urls)),
    path('api/usuariosred/crear/', usuarioRedcrearViews.as_view(), name='crear_usuario'),

    path('api/login/',LoginView.as_view(),name= 'login') #url para el login
]