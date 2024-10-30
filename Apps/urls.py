from  django.urls import path

from .views import ContactoView, LoginView



urlpatterns = {
    path('contacto/', ContactoView.as_view(), name='contacto'),
    path('login/', LoginView.as_view(), name='login'),
}