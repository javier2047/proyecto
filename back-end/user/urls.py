from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),  # Ruta para el login
     path('check_session/', views.check_session, name='check_session'),
]
