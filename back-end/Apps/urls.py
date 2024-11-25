from  django.urls import path,include
from rest_framework import routers
from .views import login, registra, perfil

routers =routers.DefaultRouter()
routers.register(r'Apps',views.registra,'registra')

urlpatterns = {
    path('login/',  login.as_view(), name='login'),
    path('registra/', registra.as_view(), name='registra'),
}