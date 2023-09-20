# Generated by Django 4.2.5 on 2023-09-19 10:19

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0029_alter_admissionform_phonenumber_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admissionform',
            name='phonenumber',
            field=models.PositiveBigIntegerField(validators=[django.core.validators.MinValueValidator(1000000000, message='Enter valid phonenumber'), django.core.validators.MaxValueValidator(9999999999, message='Enter valid phonenumber')]),
        ),
        migrations.AlterField(
            model_name='admissionform',
            name='zipcode',
            field=models.PositiveBigIntegerField(validators=[django.core.validators.MinValueValidator(100000, message='Enter valid zipcode'), django.core.validators.MaxValueValidator(999999, message='Enter valid zipcode')]),
        ),
    ]
