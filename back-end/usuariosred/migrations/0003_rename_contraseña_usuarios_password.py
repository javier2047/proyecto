# Generated by Django 5.1.2 on 2024-11-21 22:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuariosred', '0002_usuarios_if_activate_alter_usuarios_contraseña'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuarios',
            old_name='contraseña',
            new_name='password',
        ),
    ]
