from django.db.models import Q
from rest_framework import serializers, viewsets, routers

# Serializers define the API representation.
from cards.models import Card, Deck, CardsInDeck, Mana, ManaForCard


class ManaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mana
        fields = "__all__"


class ManaForCardSerializer(ManaSerializer):
    quantity = serializers.ReadOnlyField()
    mana = ManaSerializer()

    class Meta:
        model = ManaForCard
        fields = ['mana', 'quantity']


class CardSerializer(serializers.ModelSerializer):
    spell_type = serializers.CharField(source='get_spell_type_display', )
    mana = ManaForCardSerializer(many=True, source='manaforcard_set')

    class Meta:
        model = Card
        fields = "__all__"


class CardsInDeckSerializer(CardSerializer):
    quantity = serializers.ReadOnlyField()
    card = CardSerializer()

    class Meta:
        model = CardsInDeck
        fields = ['card', 'quantity']


class DeckSerializer(serializers.ModelSerializer):
    cards = CardsInDeckSerializer(many=True, source='cardsindeck_set')

    color = serializers.ReadOnlyField(source='get_color')

    class Meta:
        model = Deck
        fields = "__all__"


class DeckViewSet(viewsets.ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    lookup_field = 'name'


# ViewSets define the view behavior.
class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Card.objects.all()
        cardname = self.request.query_params.get('name', None)
        colorless = self.request.query_params.get('colorless', None)
        white = self.request.query_params.get('white', None)
        blue = self.request.query_params.get('blue', None)
        black = self.request.query_params.get('black', None)
        red = self.request.query_params.get('red', None)
        green = self.request.query_params.get('green', None)
        print(self.request.query_params)
        if cardname is not None:
            queryset = queryset.search(cardname)

        color_queryset = Q()
        if colorless is not None:
            color_queryset |= Q(mana__name='colorless')
        if white is not None:
            color_queryset |= (Q(mana__name__in=['white', 'bluewhite']))
        if blue is not None:
            color_queryset |= (Q(mana__name__in=['blue', 'bluewhite']))
        if black is not None:
            color_queryset |= Q(mana__name='black')
        if red is not None:
            color_queryset |= Q(mana__name='red')
        if green is not None:
            color_queryset |= Q(mana__name='green')
        return queryset.filter(color_queryset)


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'cards', CardViewSet)
router.register(r'decks', DeckViewSet)
