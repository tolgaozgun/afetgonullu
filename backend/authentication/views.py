from datetime import timedelta, timezone
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordResetForm
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from .serializers import UserSerializer, ForgotPasswordSerializer
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework_jwt.settings import api_settings
import jwt


class LoginView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Wrong Credentials"}, status=400)

class RegisterView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        email = request.data.get("email", "")
        if not username and not password and not email:
            return Response({"error": "Please provide all required fields"}, status=400)
        user = User.objects.create_user(
            username=username, password=password, email=email
        )
        user.is_active = False
        user.save()
        message = render_to_string(
            "account_activate_email.html",
            {
                "user": user,
                "domain": request.get_host(),
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "token": account_activation_token.make_token(user),
            },
        )
        send_mail(
            "Activate your account",
            message,
            "noreply@example.com",
            [email],
            fail_silently=False,
        )
        return Response({"message": "Please confirm your email address to complete the registration"})

class ActivateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'message': 'Your account has been activated successfully'})
        else:
            return Response({'message': 'Activation link is invalid!'})


class ForgotPasswordView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ForgotPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(email=serializer.validated_data['email'])
        # Generate and save a token for resetting the password
        reset_token = generate_reset_token(user)
        send_password_reset_email(user, reset_token)
        return Response({'detail': 'Password reset email sent.'}, status=status.HTTP_200_OK)

class ProcessForgotPasswordView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ForgotPasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            send_password_reset_email(user=user, request=request)
            return Response({'success': 'Password reset email sent'})


def send_password_reset_email(user, request):
    reset_password_token = generate_reset_token(user)
    url = request.build_absolute_uri(
        reverse('password_reset_confirm', kwargs={'token': reset_password_token})
    )
    message = render_to_string('password_reset_email.html', {'url': url})
    mail = EmailMessage('Password Reset', message, to=[user.email])
    mail.send()


def generate_reset_token(user):
    return jwt.encode({'email': user.email, 'exp': timezone.now() + timedelta(hours=24)},
                      settings.SECRET_KEY, algorithm='HS256').decode('utf-8')