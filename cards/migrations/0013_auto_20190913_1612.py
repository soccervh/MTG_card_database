# Generated by Django 2.2 on 2019-09-13 16:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0012_auto_20190913_1602'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='cardsindeck',
            unique_together={('card', 'deck')},
        ),
    ]
