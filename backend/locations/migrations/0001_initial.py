# Generated by Django 4.1.6 on 2023-02-07 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('needs_help', models.BooleanField(default=False)),
                ('help_message', models.TextField()),
            ],
        ),
    ]
