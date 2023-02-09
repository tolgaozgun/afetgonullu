from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from authentication.serializers import UserSerializer
from django.contrib.auth import get_user_model
from locations.models import Location
from locations.serializers import LocationSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


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


# Create Django Rest Framework API view 
# That will only accept authenticated users
# And will return all locations of current user
# # in a JSON file
# class LocationAdminList(generics.ListCreateAPIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     queryset = Location.objects.all()
#     serializer_class = LocationSerializer

#     # Get current user, then get his locations
#     def get(self, request, *args, **kwargs):
#         user = self.request.user
#         return Location.objects.filter(user=user)

#     # permission_classes = [IsAuthenticated]



class LocationAdminList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def get(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        user = request.user
        queryset = Location.objects.filter(user=user)
        serializer = LocationSerializer(queryset, many=True)
        return Response(serializer.data)


    # permission_classes = (permissions.IsAuthenticated,)
    # queryset = Location.objects.filter(user=user)
    # serializer_class = LocationSerializer
    # # permission_classes = [IsAuthenticated]

    
    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         return [AllowAny()]
    #     return [IsAuthenticated()]


# class LocationAdminList(generics.ListCreateAPIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     queryset = Location.objects.all()
#     serializer_class = LocationSerializer

#     # Get current user, then get his locations
#     def get(self, request, *args, **kwargs):
#         user = self.request.user
#         return Location.objects.filter(user=user)

    # permission_classes = [IsAuthenticated]
    