# Generated by Django 4.2.3 on 2023-09-12 07:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_subgrade_mark'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subgrade',
            name='grade',
        ),
    ]
