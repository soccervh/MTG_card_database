# Generated by Django 2.2 on 2019-09-13 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0013_auto_20190913_1612'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardsindeck',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]
