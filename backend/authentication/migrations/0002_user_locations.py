# Generated by Django 4.1.6 on 2023-02-08 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0007_location_city'),
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='locations',
            field=models.ManyToManyField(to='locations.location'),
        ),
    ]
