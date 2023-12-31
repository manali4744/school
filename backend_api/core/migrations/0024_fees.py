# Generated by Django 4.2.5 on 2023-09-15 10:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0023_rename_oordinator_event_coordinator'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fees',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('standard', models.IntegerField(unique=True, validators=[django.core.validators.MaxValueValidator(12), django.core.validators.MinValueValidator(1)])),
                ('academic_fee', models.IntegerField()),
                ('lunch_fee', models.IntegerField()),
                ('co_curricular_fee', models.IntegerField()),
                ('transport_fee', models.IntegerField()),
            ],
        ),
    ]
