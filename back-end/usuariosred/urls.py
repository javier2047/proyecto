from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from .views import usuarioRedcrearViews
from .views import login
from rest_framework import routers
from usuariosred import views



urlpatterns = [
    path('api/usuariosred/crear/', usuarioRedcrearViews.as_view(), name='crear_usuario'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 
    path('api/login',login.as_view(),name= 'login') #url para el login
]