from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view


@api_view(['POST'])
def login(request):
    return  Response({})



@api_view(['POST'])
def registra(request):

    print(request.data)

    return  Response({})



@api_view(['POST'])
def perfil(request):
    return  Response({})

