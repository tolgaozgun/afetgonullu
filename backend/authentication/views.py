from rest_framework import generics, authentication, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .serializers import UserSerializer
from authentication.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK

class LoginAPIView(generics.GenericAPIView):
    authentication_classes = (authentication.BasicAuthentication,)
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)
        if user:
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"token": token.key})
            else:
                return Response({"error": "Hesabınız aktif değil"})
        else:
            return Response({"error": "Eposta veya şifre hatalı"})

class RegisterAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LoginAPIView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        token = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)
        if user:
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"token": token.key})
            else:
                return Response({"error": "Hesabınız aktif değil"})
        else:
            return Response({"error": "Eposta veya şifre hatalı"})