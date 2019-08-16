# Generated by Django 2.2 on 2019-08-13 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0002_auto_20190813_2100'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='year_in_school',
            field=models.CharField(choices=[('FR', 'Freshman'), ('SO', 'Sophomore'), ('JR', 'Junior'), ('SR', 'Senior')], max_length=2),
        ),
    ]
