# Generated by Django 4.2.3 on 2023-09-12 07:17

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_alter_subgrade_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='subgrade',
            name='mark',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
        ),
    ]
