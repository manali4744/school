# Generated by Django 4.2.5 on 2023-10-09 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0034_admissionform_is_accepted'),
    ]

    operations = [
        migrations.AddField(
            model_name='admissionform',
            name='is_pending',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='admissionform',
            name='is_rejected',
            field=models.BooleanField(default=False),
        ),
    ]
