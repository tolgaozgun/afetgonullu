from rest_framework import generics
from rest_framework.permissions import IsAuthenticated 
from .models import Location
from .serializers import LocationSerializer

class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]