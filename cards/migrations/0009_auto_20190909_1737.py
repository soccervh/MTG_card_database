# Generated by Django 2.2 on 2019-09-09 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0008_card_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='mana_black',
            field=models.IntegerField(choices=[(0, 0), (1, 1), (2, 2), (3, 3),
                                               (4, 4)],
                                      default=0),
        ),
        migrations.AddField(
            model_name='card',
            name='mana_blue',
            field=models.IntegerField(choices=[(0, 0), (1, 1), (2, 2), (3, 3),
                                               (4, 4)],
                                      default=0),
        ),
        migrations.AddField(
            model_name='card',
            name='mana_colorless',
            field=models.IntegerField(choices=[(0, 0), (1, 1), (2, 2), (3, 3),
                                               (4, 4)],
                                      default=0),
        ),
        migrations.AddField(
            model_name='card',
            name='mana_green',
            field=models.IntegerField(choices=[(0, 0), (1, 1), (2, 2), (3, 3),
                                               (4, 4)],
                                      default=0),
        ),
        migrations.AddField(
            model_name='card',
            name='mana_red',
            field=models.IntegerField(choices=[(0, 0), (1, 1), (2, 2), (3, 3),
                                               (4, 4)],
                                      default=0),
        ),
        migrations.AddField(
            model_name='card',
            name='mana_white',
            field=models.IntegerField(choices=[(0, 0), (1, 1), (2, 2), (3, 3),
                                               (4, 4)],
                                      default=0),
        ),
    ]