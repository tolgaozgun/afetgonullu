# Generated by Django 4.1.6 on 2023-02-09 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0011_location_update_automatically'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='update_automatically',
            field=models.BooleanField(default=False),
        ),
    ]
