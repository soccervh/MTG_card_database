from rest_framework import serializers, viewsets, routers

# Serializers define the API representation.
from cards.models import Card, Deck, CardsInDeck


class CardSerializer(serializers.ModelSerializer):
    spell_type = serializers.CharField(source='get_spell_type_display', )

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

        if colorless is not None:
            queryset = queryset.filter(mana_colorless__gte=1)
        if white is not None:
            queryset = queryset.filter(mana_white__gte=1)
        if blue is not None:
            queryset = queryset.filter(mana_blue__gte=1)
        if black is not None:
            queryset = queryset.filter(mana_black__gte=1)
        if red is not None:
            queryset = queryset.filter(mana_red__gte=1)
        if green is not None:
            queryset = queryset.filter(mana_green__gte=1)
        return queryset


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'cards', CardViewSet)
router.register(r'decks', DeckViewSet)
