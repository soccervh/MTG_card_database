# Generated by Django 2.2 on 2019-08-17 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0002_auto_20190817_2204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='name',
            field=models.SlugField(default='some default name', max_length=120),
        ),
    ]
