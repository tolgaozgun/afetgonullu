from django.contrib.auth.models import User
from django.db import models

class CustomUser(User):
    is_staff = models.BooleanField(default=False)