# Generated by Django 5.1.2 on 2024-10-28 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formularios',
            name='motivo',
            field=models.CharField(max_length=20),
        ),
    ]
