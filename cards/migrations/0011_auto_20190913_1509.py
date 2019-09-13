# Generated by Django 2.2 on 2019-09-13 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0010_auto_20190910_1401'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='creature_type',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
        migrations.AddField(
            model_name='card',
            name='is_legendary',
            field=models.BooleanField(choices=[('Legendary', ((False, 'No'),
                                                              (True, 'Yes')))],
                                      default=False),
        ),
    ]
