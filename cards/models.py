from django.db import models
from autoslug import AutoSlugField

# Create your models here.


class Card(models.Model):
    name = models.CharField(
        unique=True,
        default='some default name',
        max_length=120,
    )
    X_MANA_COST = -1
    # mana = models.CharField(max_length=20)
    slug = AutoSlugField(populate_from='name', always_update=True)
    image = models.ImageField(upload_to='cards', blank=True, null=True)
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
    spell_type = models.CharField(max_length=2,
                                  choices=SPELL_TYPE,
                                  default=CREATURE)
    NUMBER_OF_MANA = [(0, 0), (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6),
                      (7, 7), (8, 8), (9, 9), (10, 10), (X_MANA_COST, "X")]
    mana_colorless = models.IntegerField(default=0, choices=NUMBER_OF_MANA)
    mana_white = models.IntegerField(default=0, choices=NUMBER_OF_MANA)
    mana_blue = models.IntegerField(default=0, choices=NUMBER_OF_MANA)
    mana_black = models.IntegerField(default=0, choices=NUMBER_OF_MANA)
    mana_red = models.IntegerField(default=0, choices=NUMBER_OF_MANA)
    mana_green = models.IntegerField(default=0, choices=NUMBER_OF_MANA)

    abilities = models.CharField(null=True, blank=True, max_length=120)
    text = models.TextField(null=True, blank=True)
    flavor_text = models.TextField(null=True, blank=True)
    card_number = models.PositiveIntegerField(default=0)
    artist = models.CharField(default='some magic artist', max_length=120)

    class Meta:
        ordering = ['card_number']

    def sluggy(self):
        return self.text

    def __str__(self):
        return f"Card #{self.card_number} {self.name}"
