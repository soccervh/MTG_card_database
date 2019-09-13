from django.db import models
from autoslug import AutoSlugField
from django.db.models import Q

# Create your models here.


class CardQuerySet(models.QuerySet):
    def search(self, query=None):
        qs = self
        if query is not None:
            or_lookup = (Q(name__icontains=query)
                         | Q(text__icontains=query)
                         | Q(abilities__icontains=query)
                         | Q(artist__icontains=query)
                         | Q(slug__icontains=query))
            qs = qs.filter(or_lookup).distinct(
            )  # distinct() is often necessary with Q lookups
        return qs


class CardManager(models.Manager):
    def get_queryset(self):
        return CardQuerySet(self.model, using=self._db)

    def search(self, query=None):
        return self.get_queryset().search(query=query)


class Card(models.Model):
    name = models.CharField(
        unique=True,
        default='some default name',
        max_length=120,
    )
    LEGENDARY_CHOICES = [('Legendary', ((False, 'No'), (True, 'Yes')))]
    is_legendary = models.BooleanField(choices=LEGENDARY_CHOICES,
                                       default=False)

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
    creature_type = models.CharField(null=True, blank=True, max_length=120)
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

    objects = CardManager()

    class Meta:
        ordering = ['card_number']

    def sluggy(self):
        return self.text

    def __str__(self):
        return f"Card #{self.card_number} {self.name}"


class Deck(models.Model):
    name = models.CharField(max_length=120, default='Deck Name')
    cards = models.ManyToManyField(Card,
                                   through='CardsInDeck',
                                   through_fields=('deck', 'card'))

    def __str__(self):
        return self.name


class CardsInDeck(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    class Meta:
        unique_together = ['card', 'deck']

    def __str__(self):
        return f"{self.deck.name}: {self.card} x{self.quantity}"
