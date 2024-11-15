from  django.urls import path, include

from rest_framework.documentation import include_docs_urls

from rest_framework import routers
from tasks import views

#from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


#
routers =routers.DefaultRouter()
routers.register(r'tasks',views.tasksvista,'tasks')


#v1 el nombre de la version de la api

urlpatterns = [
    path('api/v1/',include(routers.urls)),
  #  path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
  # path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
  # path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

]

