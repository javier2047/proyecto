# Generated by Django 5.1.2 on 2024-11-29 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_usuarios_options_usuarios_groups_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='rutsupervisor',
            field=models.CharField(default='no tiene', max_length=12),
        ),
    ]
