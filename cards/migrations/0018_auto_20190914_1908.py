# Generated by Django 2.2 on 2019-09-14 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0017_auto_20190914_1904'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='artist',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AlterField(
            model_name='card',
            name='name',
            field=models.CharField(default='', max_length=120, unique=True),
        ),
    ]