import csv
import random
import requests
import os
import django
import time
import re
import pandas as pd

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "afetgonullu.settings")
os.environ["DJANGO_SETTINGS_MODULE"] = "afetgonullu.settings"
django.setup()

from authentication.models import User
from locations.models import Location

# Store the list of created random variables and make sure there is no duplicate
random_variables = []

not_valid = []

df = pd.read_excel('data.xlsx')

with open('data.csv', 'r') as file:
    reader = csv.reader(file)
    next(reader)  # skip the header row
    for row in reader:
        county = row[0]
        name = row[1]
        maps_url = row[3]

        print(county, name, maps_url)
        r = requests.get(maps_url)
        print(r.url)
        match = re.search("@(-?\d+\.\d+),(-?\d+\.\d+),", r.url)

        if match:
            latitude = match.group(1)
            longitude = match.group(2)
        else:
            not_valid.append(maps_url)
            continue

        # If location already exists, update the severity and help_message
        if Location.objects.filter(name=name).exists():
            location = Location.objects.get(name=name)
            # If 5th column's background color is red set severity to 0,
            # if it is green set severity to 5
            

            location.help_message = row[4]
            location.save()
            continue

        location = Location.objects.create(county=county, name=name, maps_url=maps_url, latitude=latitude, longitude=longitude, severity = 0)

        random_integer = random.randint(0, 99999)
        # Make sure the random integer is not already in the list
        while random_integer in random_variables:
            random_integer = random.randint(0, 99999)
        random_variables.append(random_integer)


        email = f"deprem{random_integer}@gonullu.com"
        password = "1234567"
        print(email, password)
        user = User.objects.create_user(email=email, password=password)
        user.locations.add(location)

        # Wait for a second
        time.sleep(1)
    
    # Write not_valid to notvalid.txt
    with open('notvalid.txt', 'w') as f:
        for invalid in not_valid:
            f.write(invalid + "\n")