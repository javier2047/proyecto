from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import usuarioRedcrearViews




urlpatterns = [
    path('api/usuariosred/',usuarioRedcrearViews.as_view(),name='usuario-create'),
    #path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 
    
]