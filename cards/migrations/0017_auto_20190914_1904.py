# Generated by Django 2.2 on 2019-09-14 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0016_card_expansion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='expansion',
            field=models.CharField(choices=[('ELD', 'Throne of Eldraine (ELD)')
                                            ],
                                   default='ELD',
                                   max_length=25),
        ),
    ]
