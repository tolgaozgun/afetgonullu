from rest_framework import serializers
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'latitude', 'longitude', 'needs_help', 'help_message', 'latest_information_date']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['geometry'] = {
            'lat': data['latitude'],
            'lon': data['longitude']
        }
        data['help'] = {
            'needed': data["needs_help"],
            'message': data['help_message'],
        }
        return data