import hashlib
import os
from cryptography.hazmat.primitives import hashes
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.crypto import get_random_string
from datetime import datetime, timedelta

# Función para crear un hash seguro para la cookie
def generate_secure_token(user_id):
    # Usamos un salt para asegurar que el token es único por usuario
    salt = os.urandom(16)
    hash_object = hashlib.sha256(salt + user_id.encode('utf-8'))
    return hash_object.hexdigest()

# Vista para login
def login(request):
    rut = request.POST.get('rut')
    password = request.POST.get('password')
    
    user = authenticate(rut=rut, password=password)
    
    if user is not None:
        # Creamos un token único para el usuario
        token = generate_secure_token(user.id)
        
        # Definir la cookie con el token encriptado
        response = JsonResponse({'message': 'Login successful'})
        
        # Establecer la cookie hasheada con el token (con duración de 1 hora)
        response.set_cookie(
            'session_token', token, max_age=3600, httponly=True, secure=True, samesite='Strict'
        )
        
        return response
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=400)

def check_session(request):
    # Obtener el token de la cookie
    token = request.COOKIES.get('session_token')

    if token:
        # Aquí puedes validar el token, por ejemplo, verificando si corresponde a un usuario en tu base de datos
        # Esta es una validación básica para comprobar si existe el token en la cookie.
        # En un caso real, deberías comparar el token con los valores en tu base de datos.
        return JsonResponse({'message': 'Session valid'})
    else:
        return JsonResponse({'error': 'Session not found'}, status=400)
