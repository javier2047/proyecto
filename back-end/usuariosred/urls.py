from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from .views import usuarioRedcrearViews
<<<<<<< HEAD:usuariosred/urls.py
from .views import LoginView
from rest_framework import routers
from usuariosred import views
=======

>>>>>>> 9f589785cb079e6c80509843a6de0b17d5018f79:back-end/usuariosred/urls.py



urlpatterns = [
<<<<<<< HEAD:usuariosred/urls.py
    path('api/usuariosred/crear/', usuarioRedcrearViews.as_view(), name='crear_usuario'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 
    path('api/login',LoginView.as_view(),name= 'login') #url para el login
=======
    path('api/usuariosred/',usuarioRedcrearViews.as_view(),name='usuario-create'),
    #path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 
>>>>>>> 9f589785cb079e6c80509843a6de0b17d5018f79:back-end/usuariosred/urls.py
]