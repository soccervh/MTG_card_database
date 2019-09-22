# Generated by Django 2.2 on 2019-09-14 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0019_auto_20190914_1919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='spell_type',
            field=models.CharField(choices=[('CR', 'Creature'),
                                            ('PL', 'Planeswalker'),
                                            ('IN', 'Instant'),
                                            ('SO', 'Sorcery'),
                                            ('EN', 'Enchantment'),
                                            ('AR', 'Artifact'),
                                            ('AC', 'Artifact Creature'),
                                            ('LD', 'Land')],
                                   default='CR',
                                   max_length=2),
        ),
    ]
