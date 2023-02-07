from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated 
from .models import Location
from .serializers import LocationSerializer

class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    # permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]