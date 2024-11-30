'''from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
import os

#Esta parte es la que hace la logica del correo, deberia funcionar.
class email_Api_view(APIView):
    def post(self, request):
        try:
            to_email = os.environ.get('email_user') 
            subject = 'Confirmacion de formulario'
            message = 'Su formulario fue enviado exitosamente\nEste mensaje fue enviado automaticamente, no responder'
            send_mail(subject, message, None, [to_email])
            return Response({'message':'Correo enviado exitosamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = str(e)
            return Response({'message':error_message}, status=status.HTTP_400_BAD_REQUEST)'''
#Sabado 30/11 nuevo intento
#El path esta seteado ya, pero igual peguenle una mirada.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail

class email_Api_view(APIView):
    def post(self, request):
        try:
            #Aca tomamos el correo del remitente.
            #agregue ese campo al formulario, quizas haya quedado un poco mal identado.
            to_email = request.data.get('email')
            if not to_email:
                return Response({'message': 'Email es requerido'}, status=status.HTTP_400_BAD_REQUEST)

            subject = 'Confirmación de formulario'
            message = (
                'Su formulario fue enviado exitosamente.\n\n'
                'Este mensaje fue enviado automáticamente, no responder.'
            )

            #Envio del correo
            send_mail(
                subject,
                message,
                None,  #From email definido en la configuración de Django
                [to_email]
            )

            return Response({'message': 'Correo enviado exitosamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
