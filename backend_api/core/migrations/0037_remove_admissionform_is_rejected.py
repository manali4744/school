# Generated by Django 4.2.5 on 2023-10-09 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0036_alter_admissionform_is_pending'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='admissionform',
            name='is_rejected',
        ),
    ]
