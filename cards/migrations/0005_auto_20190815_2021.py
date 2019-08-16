# Generated by Django 2.2 on 2019-08-15 20:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0004_auto_20190813_2107'),
    ]

    operations = [
        migrations.RenameField(
            model_name='card',
            old_name='name',
            new_name='Name',
        ),
        migrations.RenameField(
            model_name='card',
            old_name='content',
            new_name='Text',
        ),
        migrations.AddField(
            model_name='card',
            name='Abitities',
            field=models.CharField(default=django.utils.timezone.now, max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='card',
            name='Artist',
            field=models.CharField(default=django.utils.timezone.now, max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='card',
            name='Card_number',
            field=models.PositiveSmallIntegerField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='card',
            name='Flavor_text',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='card',
            name='spell_type',
            field=models.CharField(choices=[('CR', 'Creature'), ('PL', 'Planeswalker'), ('IN', 'Instant'), ('SO', 'Sorcery'), ('EN', 'Enchantment'), ('AR', 'Artifact')], default='CR', max_length=2),
        ),
    ]
