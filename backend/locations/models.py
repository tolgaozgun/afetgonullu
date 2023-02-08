from django.db import models

class Location(models.Model):
    name = models.TextField()
    city = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    needs_people = models.BooleanField(default=True)
    needs_donation = models.BooleanField(default=True)
    help_message = models.TextField(null=True, blank=True)
    severity = models.IntegerField()
    latest_information_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name