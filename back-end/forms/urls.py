from  django.urls import path, include

from rest_framework import routers
from forms import views

#
routers =routers.DefaultRouter()
routers.register(r'forms',views.vistaformularios,'forms')


#v1 el nombre de la version de la api

urlpatterns = [
path('api/forms1/',include(routers.urls)) 

]