from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from .models import Usuarios

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
