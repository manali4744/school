# Generated by Django 4.2.5 on 2023-09-20 04:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0030_alter_admissionform_phonenumber_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admissionform',
            name='admission_year',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='core.admission'),
        ),
        migrations.AlterUniqueTogether(
            name='admissionform',
            unique_together={('firstName', 'father_name', 'lastName', 'emailaddress')},
        ),
    ]
