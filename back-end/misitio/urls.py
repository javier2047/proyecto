"""
URL configuration for misitio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from email_service.api.views import email_Api_view




urlpatterns = [
    path('admin/', admin.site.urls),
    path('tasks/',include('tasks.urls')),
    path('forms/', include('forms.urls')),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
    #path('user/', include('user.urls')),
    #path('usuarios/',include('usuarios.urls')),\
    #El de abajo, fue para el primer intento.
    #path('send-email', email_Api_view.as_view(), name='send-email') 
    #Este es el que estaba usando ahora al ultimo.
     path('forms/api/email/', email_Api_view.as_view(), name='email-api')
]
