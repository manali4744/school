# Generated by Django 4.2.5 on 2023-10-09 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0035_admissionform_is_pending_admissionform_is_rejected'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admissionform',
            name='is_pending',
            field=models.BooleanField(default=True),
        ),
    ]
