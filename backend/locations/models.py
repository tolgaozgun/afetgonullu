from django.db import models

class Location(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    needs_help = models.BooleanField(default=False)
    help_message = models.TextField(null=True, blank=True)
    latest_information_date = models.DateTimeField(auto_now_add=True)