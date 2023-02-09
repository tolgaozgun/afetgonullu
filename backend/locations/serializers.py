from rest_framework import serializers
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'severity', 'city', 'latitude', 'longitude', 'needs_people', "needs_donation", 'help_message', 'latest_information_date']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['geometry'] = {
            'lat': data['latitude'],
            'lon': data['longitude']
        }
        data['help'] = {
            'needed': data["needs_people"],
            'message': data['help_message'],
        }
        data['properties'] = {
            'name': data["name"],
        }
        return data
    
