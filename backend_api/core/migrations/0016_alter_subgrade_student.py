# Generated by Django 4.2.3 on 2023-09-12 07:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_subgrade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subgrade',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.result'),
        ),
    ]
