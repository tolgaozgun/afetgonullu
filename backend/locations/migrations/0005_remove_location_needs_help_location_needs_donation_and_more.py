# Generated by Django 4.1.6 on 2023-02-08 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0004_location_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='needs_help',
        ),
        migrations.AddField(
            model_name='location',
            name='needs_donation',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='location',
            name='needs_people',
            field=models.BooleanField(default=True),
        ),
    ]