# Generated by Django 4.2.5 on 2023-09-15 10:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0024_fees'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Fees',
            new_name='Fee',
        ),
    ]
