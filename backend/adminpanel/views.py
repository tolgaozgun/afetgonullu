from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from authentication.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your views here.

class AddUserAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": f"Account created for {user.username}"})


class EditUserAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": f"Account updated for {user.username}"})