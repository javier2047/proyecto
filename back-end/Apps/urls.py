from  django.urls import path,include
from rest_framework import routers
from .views import login, registra, perfil
from django.urls import path
from django.contrib.auth import views as auth_views

routers =routers.DefaultRouter()
routers.register(r'Apps',views.registra,'registra')

urlpatterns = {
    path('login/',  login.as_view(), name='login'),
    path('registra/', registra.as_view(), name='registra'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
}