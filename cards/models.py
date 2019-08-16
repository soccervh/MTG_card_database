from django.db import models

# Create your models here.


class Card(models.Model):
    name = models.CharField(default='some default name', max_length=120,)
    # mana = models.CharField(max_length=20)

    abilities = models.CharField(null=True, blank=True, max_length=120)
    text =  models.TextField(null=True, blank=True)
    flavor_text = models.TextField(null=True, blank=True)
    card_number = models.PositiveIntegerField(default=0, max_length=120)
    artist = models.CharField(default='some magic artist', max_length=120)
    # spell_type

    CREATURE = 'CR'
    PLANESWALKER = 'PL'
    INSTANT = 'IN'
    SORCERY = 'SO'
    ENCHANTMENT = 'EN'
    ARTIFACT = 'AR'
    SPELL_TYPE = [
        (CREATURE, 'Creature'),
        (PLANESWALKER, 'Planeswalker'),
        (INSTANT, 'Instant'),
        (SORCERY, 'Sorcery'),
        (ENCHANTMENT, 'Enchantment'),
        (ARTIFACT, 'Artifact'),
    ]
    spell_type = models.CharField(
        max_length=2,
        choices=SPELL_TYPE,
        default=CREATURE
    )

    def is_upperclass(self):
        return self.spell_type in ()

